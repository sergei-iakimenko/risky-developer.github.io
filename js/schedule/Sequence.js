import SequenceButtonsManager from '../Helpers/SequenceButtonsManager.js';
import SecondsConverter from '../Helpers/SecondsConverter.js';
import {handleTap} from '../main.js';
import {buttonClassName} from './constants.js';

/**
 * Represents sequence of sounds
 */
class Sequence {
    constructor () {
        this.timings =
            new Map(); // {time: number, [soundName: string]
    }

    addTiming(soundName, currentTime) {
        // Add timing to time map
        if (this.timings.has(currentTime)) {
            this.timings.get(currentTime).push(soundName);
        } else {
            this.timings.set(currentTime, [soundName]);
        }

        const removeTimingWithCurrentContext = this.removeTiming.bind(this);

        // Add div with elapsed time from start
        SequenceButtonsManager.appendButton(
            buttonClassName.sequence,
            SecondsConverter.toString(currentTime),
            handleTap(soundName, function() {
                this.parentNode.removeChild(this);
                removeTimingWithCurrentContext(soundName, currentTime);
            })
        );
    }

    removeTiming(soundName, currentTime) {
        const soundNames = this.timings.get(currentTime);
        if (soundNames) {
            if (soundNames.length < 2) {
                this.timings.delete(currentTime);
            } else {
                const soundNameIndex = soundNames.indexOf(soundName);
                if (soundNameIndex >= 0) {
                    soundNames.splice(soundNameIndex, 1);
                }
            }
        }
    }

    // Clear sequence container
    static clearContainer () {
        const buttonList = document.querySelectorAll(`.${buttonClassName.sequence} > button`);
        for (const button of buttonList) {
            button.remove();
        }
    }
}

export default Sequence;