import SecondsConverter from '../Helpers/SecondsConverter.js'

/**
 * Represents sequence of sounds
 */
class Sequence {
    constructor () {
        this.timeLength = 0;
        this.timingList = [];
        this.soundNameList = [];

        this.container = document.createElement('div');
        this.container.className = 'sequence';
    }

    // Add timing to array
    addTiming(soundName, currentTime) {
        // Adding timing to array
        this.timingList.push(currentTime);
        this.soundNameList.push(soundName);

        // Adding div with elapsed time from start
        this.appendTimingButton(SecondsConverter.toString(currentTime));
    }
    /**
     * Appends div with seconds upcoming from start to div with set name
     * @param {string} timingValue value for output
     */
    appendTimingButton(timingValue) {
        const timingMarkButton = document.createElement('button');
        timingMarkButton.className = 'timing-mark';

        timingMarkButton.textContent = timingValue !== undefined ?
            timingValue : console.error('Wrong time value');

        this.container.appendChild(timingMarkButton);
    }
}

export default Sequence