/**
 * Provides approaches to convert seconds represented by double value to required value
 * @type {{toTimeObject: SecondsConverter.toTimeObject, toString: SecondsConverter.toString}}
 */
class SecondsConverter {
    /**
     * Convert seconds to custom time object
     * @returns {{minutes: string, seconds: string, milliseconds: string}}
     */
    static toTimeObject (incomingSeconds) {
        let innerTime = incomingSeconds;

        let minutes = Math.floor(innerTime / 60).toString().padStart(2, '0');

        innerTime = innerTime % 60;
        let secondsMilliSeconds = String(innerTime).split('.');

        let seconds = secondsMilliSeconds[0].padStart(2, '0');
        let milliseconds = secondsMilliSeconds[1] && secondsMilliSeconds[1] !== '' ? secondsMilliSeconds[1][0]
            : '0';

        return {minutes, seconds, milliseconds};
    }

    /**
     * Convert custom time object to readable string
     * @returns {string}
     */
    static toString (incomingSeconds) {
        const timeObject = this.toTimeObject(incomingSeconds);
        return `${timeObject.minutes}:${timeObject.seconds}:${timeObject.milliseconds}`;
    }
}

export default SecondsConverter