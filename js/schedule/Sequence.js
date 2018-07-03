import SequenceButtonsManager from '../Helpers/SequenceButtonsManager.js';
import SecondsConverter from '../Helpers/SecondsConverter.js';

/**
 * Represents sequence of sounds
 */
class Sequence {
    constructor () {
        this.timeLength = 0;
        this.timingList = [];
        this.soundNameList = [];
    }

    addTiming(soundName, currentTime) {
        // Adding timing to array
        this.timingList.push(currentTime);
        this.soundNameList.push(soundName);

        // Add div with elapsed time from start
        SequenceButtonsManager.appendButton('sequence', SecondsConverter.toString(currentTime));
    }

    // Clear sequence container
    static clearContainer () {
        const buttonList = document.querySelectorAll('.sequence > button');
        for (const button of buttonList) {
            button.remove();
        }
    }
}

export default Sequence;