/**
 * Provides approaches to convert milliseconds represented by number value to required value
 * @type {{toTimeObject: millisecondsConverter.toTimeObject, toString: millisecondsConverter.toString}}
 */
const millisecondsConverter = {
    /**
     * Convert milliseconds to custom time object
     * @returns {{minutes: string, seconds: string, milliseconds: string}}
     */
    toTimeObject: function (incomingMilliseconds) {
        let innerTime = incomingMilliseconds;
        innerTime = innerTime % (1000 * 3600 * 24);
        innerTime = innerTime % (3600 * 1000);

        let minutes = Math.floor(innerTime / (60 * 1000)).toString().padStart(2, '0');

        innerTime = innerTime % (60 * 1000);
        let secondsMilliSeconds = String(innerTime / 1000).split('.');

        let seconds = secondsMilliSeconds[0].padStart(2, '0');
        let milliseconds = secondsMilliSeconds[1] && secondsMilliSeconds[1] !== '' ? secondsMilliSeconds[1][0]
            : '0';

        return {minutes, seconds, milliseconds};
    },

    /**
     * Convert custom time object to readable string
     * @returns {string}
     */
    toString: function (incomingMilliseconds) {
        const timeObject = this.toTimeObject(incomingMilliseconds);
        return `${timeObject.minutes}:${timeObject.seconds}:${timeObject.milliseconds}`;
    }
};