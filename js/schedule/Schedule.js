/**
 * Represents schedule of sound sequences
 * To be enhanced to any size of sequences, now only one
 */
class Schedule {
    constructor () {
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');

        this.timeLeft = 0;

        // Special time for replay.
        this.replayTimeLeft = 0;
        this.currentTimeLength = 0;
        this.timeouts = [];

        this.currentSequence = 0;

        let sequence = new Sequence();
        this.sequences = [];
        this.sequences.push(sequence);
    }

    /**
     * Stops all active timeout repeats
     */
    clearAllTimeouts () {
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
    }

    /**
     * Outputs time, elapsed from start button pushed
     */
    printTime () {
        const timeObject = MillisecondsConverter.toTimeObject(this.timeLeft);

        this.minutesElement.textContent = timeObject.minutes;
        this.secondsElement.textContent = timeObject.seconds;
        this.millisecondsElement.textContent = timeObject.milliseconds;

        this.timeLeft += 10;
        let timeoutId = setTimeout(this.printTime.bind(this), 10);
        this.timeouts.push(timeoutId);
    }

    /**
     * Runs timer
     */
    startSchedule () {
        this.clearAllTimeouts();

        this.timeLeft = 0;
        this.timeouts = [];

        // TODO: Compose player into Schedule class
        player.mode = 'record';

        this.printTime();
    }

    /**
     * Stops timer
     */
    stopSchedule () {
        this.currentTimeLength = this.timeLeft;
        this.timeLeft = 0;

        this.replayTimeLeft = 0;

        this.printTime();
        player.mode = 'play';

        this.clearAllTimeouts();
    }

    /**
     * Switches state of timer
     */
    switchScheduleState () {
        if (player.mode === 'record') {
            this.stopSchedule()
        } else {
            this.startSchedule()
        }
    }

    /**
     * Replays by schedule
     */
    playSchedule () {
        this.startSchedule();

        let replayTimeoutId = setInterval(() => {
            this.replayTimeLeft += 10;

            // TODO: Compose timings into Schedule
            if (this.sequences[this.currentSequence].timingSet.indexOf(this.replayTimeLeft) >= 0) {
                this.sequences[this.currentSequence].timingSet.forEach((value, index) => {

                    const soundName = this.sequences[this.currentSequence].padSoundArray[index];
                    if (value === this.replayTimeLeft)
                        player.playSound(soundName);

                });

            } else if (this.replayTimeLeft >= this.currentTimeLength) {
                clearInterval(replayTimeoutId);
                this.stopSchedule();
            }
        }, 10);
    }
}

let schedule = new Schedule();