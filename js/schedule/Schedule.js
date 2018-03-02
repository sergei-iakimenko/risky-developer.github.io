/**
 * Represents schedule of sound sequences
 * To be enhanced to any size of sequences, now only one
 */
class Schedule {
    /**
     * @param {string[]} audioPaths - Paths to audio files.
     */
    constructor (audioPaths) {
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');

        this.timeLeft = 0;

        // Special time for replay.
        this.replayTimeLeft = 0;
        this.currentTimeLength = 0;
        this.timeouts = [];

        this.currentSequenceIndex = 0;

        let sequence = new Sequence();
        this.sequences = [];
        this.sequences.push(sequence);

        this.player = new SoundPlayer(audioPaths);
    }

    /**
     * @returns {object} Currently chosen sequence of sounds
     */
    get currentSequence () {
        return this.sequences[this.currentSequenceIndex];
    }

    /**
     * Add sequence in list
     */
    saveSequence () {
        let sequence = new Sequence();

        this.sequences.push(sequence);
        SequenceButtonsManager.appendButton('sequences-set-container', this.currentSequenceIndex);

        this.currentSequenceIndex++;
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
        this.player.mode = 'record';

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
        this.player.mode = 'play';

        this.clearAllTimeouts();
    }

    /**
     * Switches state of timer
     */
    switchScheduleState () {
        if (this.player.mode === 'record') {
            this.stopSchedule();
        } else {
            this.startSchedule();
        }
    }

    /**
     * Replays by schedule
     */
    playSchedule () {
        this.startSchedule();

        let replayTimeoutId = setInterval(() => {
            this.replayTimeLeft += 10;

            if (this.currentSequence.timingList.indexOf(this.replayTimeLeft) >= 0) {
                this.currentSequence.timingList.forEach((value, index) => {

                    const soundName = this.currentSequence.soundNameList[index];
                    if (value === this.replayTimeLeft)
                        this.player.playSound(soundName);
                });

            } else if (this.replayTimeLeft >= this.currentTimeLength) {
                clearInterval(replayTimeoutId);
                this.stopSchedule();
            }
        }, 10);
    }
}

let schedule = new Schedule(audioPaths);