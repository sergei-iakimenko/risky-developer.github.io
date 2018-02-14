/**
 * Represents sequence of sounds
 */
class Sequence {
    constructor () {
        this.timingSet = [];
        this.padSoundArray = [];
    }

    // Adding timing to array
    addTiming(soundName) {
        // Adding timing to array
        this.timingSet.push(schedule.timeLeft);
        this.padSoundArray.push(soundName);

        // Adding div with elapsed time from start
        this.appendTimingToDiv('sequence-container',
            MillisecondsConverter.toString(schedule.timeLeft));
    }
    /**
     * Appends div with seconds upcoming from start to div with set name
     * @param {string} divName div to append milliseconds info
     * @param {string} timingValue value for output
     */
    appendTimingToDiv(divName, timingValue) {
        const timingMarkButton = document.createElement('button');
        timingMarkButton.className = 'timing-mark';

        timingMarkButton.textContent = timingValue !== undefined? timingValue : secondsElement.textContent;

        // Adding div with elapsed milliseconds from start with to div with set name
        const timingsElement = document.getElementsByClassName(divName);
        timingsElement[0].appendChild(timingMarkButton);
    }
}