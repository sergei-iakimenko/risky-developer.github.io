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
        this.timeouts = [];

        this.currentSequenceIndex = 0;
        let sequence = new Sequence();

        // Render sequence container
        this.sequenceContainer = document.getElementsByClassName('sequence-container')[0];
        this.sequenceContainer.appendChild(sequence.container);

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
     * Set current sequence
     * Should be used to edit/replay sequences
     * @param index
     */
    set currentSequence(index) {
        this.sequenceContainer.replaceChild(this.sequences[index].container, this.currentSequence.container);
        this.currentSequenceIndex = index;
    }

    /**
     * Add sequence in list
     */
    saveSequence () {
        let sequence = new Sequence();

        // Render changed sequence
        this.sequenceContainer.replaceChild(sequence.container, this.currentSequence.container);

        this.sequences.push(sequence);
        SequenceButtonsManager.appendButton('sequences-set-container', this.sequences.length - 1
            /* ,() => {
                this.currentSequence = this.sequences.length - 2;
            }*/);

        this.currentSequenceIndex = this.sequences.length - 1;
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
        this.currentSequence.timeLength = this.timeLeft;
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
     * Replay schedule with record
     */
    replaySchedule () {
        this.startSchedule();

        // if this.currentSequence.timingList !== 0
        //  then replay current sequence
        let timingMap = new Map();
        let timingLength = 0;

        // if current sequence is not empty
        if (this.currentSequence.timeLength !== 0) {
            // set time length of whole schedule by time length of current sequence
            // + generating timing map from current sequence
            this.currentSequence.timingList.forEach((item, index) => {
                timingMap.set(item, this.currentSequence.soundNameList[index]);
            });
            timingLength = this.currentSequence.timeLength;

            // else join timing list and get
        } else {
            this.sequences.forEach((sequence) => {
                // calculating time length of whole schedule by maximum value of all sequences length
                timingLength = Math.max(timingLength, sequence.timeLength);
                sequence.timingList.forEach((item, index) => {
                    timingMap.set(item, sequence.soundNameList[index]);
                });
            });
        }

        let replayTimeoutId = setInterval(() => {
            this.replayTimeLeft += 10;

            if (timingMap.has(this.replayTimeLeft)) {
                this.player.playSound(timingMap.get(this.replayTimeLeft));
            } else if (this.replayTimeLeft >= timingLength) {
                clearInterval(replayTimeoutId);
                this.stopSchedule();
            }
        }, 10);
    }
}

let schedule = new Schedule(audioPaths);