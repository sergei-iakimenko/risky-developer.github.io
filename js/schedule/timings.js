/**
 * Object of timings' set
 * @type {{timingSet: Array, addTiming: timings.addTiming, appendTimingToDiv: timings.appendTimingToDiv}}
 */
const timings = {
    timingSet: [],
    padSoundArray: [],
    addTiming: function(soundName) {
        // Adding timing to array
        this.timingSet.push(timeLeft);
        this.padSoundArray.push(soundName);

        // Adding div with elapsed milliseconds from start
        this.appendTimingToDiv('sequence-container', timeLeft);
    },
    /**
     * Appends div with seconds upcoming from start to div with set name
     * @param {string} divName div to append milliseconds info
     * @param {number} timingValue value for output
     */
    appendTimingToDiv: function (divName, timingValue) {
        const timingMarkButton = document.createElement('button');
        timingMarkButton.className = 'timing-mark';

        timingMarkButton.textContent = timingValue !== undefined? timingValue : secondsElement.textContent;

        // Adding div with elapsed milliseconds from start with to div with set name
        const timingsElement = document.getElementsByClassName(divName);
        timingsElement[0].appendChild(timingMarkButton);
    }
};