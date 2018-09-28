import SequenceButtonsManager from '../Helpers/SequenceButtonsManager.js';
import SecondsConverter from '../Helpers/SecondsConverter.js';
import Sequence from './Sequence.js';
import SoundPlayer from '../SoundPlayer.js';
import {buttonClassName} from './constants.js';

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

        this.timeouts = [];

        this.currentSequenceIndex = 0;
        let sequence = new Sequence();

        this.sequences = [];
        this.sequences.push(sequence);

        this.player = new SoundPlayer(audioPaths);

        this.startTime = this.currentContextTime;

        this.remainingSamplesCount = 0;
        this.reduceRemainingSamples = this.reduceRemainingSamples.bind(this);
    }

    /**
     * Outputs time, elapsed from start button pushed
     */
    printTime () {
        const timeObject = SecondsConverter.toTimeObject(this.currentTime);

        this.minutesElement.textContent = timeObject.minutes;
        this.secondsElement.textContent = timeObject.seconds;
        this.millisecondsElement.textContent = timeObject.milliseconds;

        let timeoutId = setTimeout(this.printTime.bind(this), 10);
        this.timeouts.push(timeoutId);
    }

    /**
     * Runs timer
     */
    startSchedule () {
        this.clearAllTimeouts();
        this.startTime = this.currentContextTime;

        this.timeouts = [];
        this.player.mode = 'record';
        this.printTime();
    }

    /**
     * Stops timer
     */
    stopSchedule () {
        this.player.mode = 'play';
        this.clearAllTimeouts();
    }

    /**
     * Time from creation of context
     */
    get currentContextTime() {
        return this.player.currentTime;
    }

    get currentTime () {
        return this.currentContextTime - this.startTime;
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
        Sequence.clearContainer();

        let sequence = new Sequence();
        this.sequences.push(sequence);
        SequenceButtonsManager.appendButton(buttonClassName.sequenceSetContainer, this.sequences.length - 1);

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
     * Reduce count of samples that not played yet
     */
    reduceRemainingSamples () {
        this.remainingSamplesCount--;
        if (this.remainingSamplesCount < 1) {
            this.stopSchedule();
        }
    };

    /**
     * Replay schedule with record
     */
    replaySchedule () {
        this.remainingSamplesCount = 0;
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

                this.remainingSamplesCount += sequence.timingList.length;
                sequence.timingList.forEach((item, index) => {
                    timingMap.set(item, sequence.soundNameList[index]);
                });
            });
        }

        // fill context within nodes with timings
        for (const timing of timingMap) {
            this.player.playSound(timing[1], timing[0], this.reduceRemainingSamples);
        }
    }
}

export default Schedule;