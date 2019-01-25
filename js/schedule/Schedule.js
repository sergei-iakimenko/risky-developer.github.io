import SequenceButtonsManager from '../Helpers/SequenceButtonsManager.js';
import SecondsConverter from '../Helpers/SecondsConverter.js';
import Sequence from './Sequence.js';
import SoundPlayer from '../SoundPlayer.js';
import {buttonClassName} from './constants.js';

const STATE = {
    RECORD: 'record',
    PLAY: 'play',
    REMOVE: 'remove'
};

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
        this.inRemoveState = false;
    }

    /**
     * Clear whole schedule and both containers of buttons
     */
    clear() {
        this.sequences.splice(0, this.sequences.length);
        this.sequences.push(new Sequence());
        this.currentSequenceIndex = 0;

        this.remainingSamplesCount = 0;
        this.timeouts.splice(0, this.timeouts.length);

        const timingMarkElements = document.querySelectorAll('.timing-mark');
        for (let button1 of timingMarkElements) {
            button1.remove();
        }
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
        this.startTime = this.currentContextTime;

        this.timeouts = [];
        this.setPlayerMode(STATE.RECORD);
        this.printTime();
    }

    /**
     * Set work mode of the player
     * @param mode {string} Setting mode
     */
    setPlayerMode(mode) {
        this.player.mode = mode;
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

        // FIXME: don't do this! Refactor how should be handled tap of sequence button
        const foolishThat = this;

        SequenceButtonsManager.appendButton(
            buttonClassName.sequenceSetContainer,
            this.sequences.length - 1,
            // Callback on sequence button click to replay saved sequence
            function() { (seqIndex => {
                        if (foolishThat.player.mode === STATE.PLAY) {
                            foolishThat.replaySequence(seqIndex)

                        } else if (foolishThat.player.mode === STATE.REMOVE) {
                            delete foolishThat.sequences[seqIndex];
                            this.parentNode.removeChild(this);
                        }
                    })(foolishThat.sequences.length - 2)
            }
        );

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
     * Switch state of timer
     */
    switchPlayerState() {
        if (this.player.mode === STATE.PLAY) {
            this.startSchedule();
        } else {
            this.setPlayerMode(STATE.PLAY);
        }
    }

    /**
     * Change state of buttons, disabled/enabled
     */
    toggleFunctionalButtons() {
        const functionalButtons = document.getElementsByClassName('functional-button');
        const padButtons = document.getElementsByClassName('pad');

        const arr = Array.from(functionalButtons).concat(Array.from(padButtons));
        arr.forEach(btn => {
            btn.disabled = !btn.disabled;
        });
    }

    /**
     * Switch state if ready to remove tapped sounds
     */
    switchRemoveState() {
        if (!this.inRemoveState) {
            this.setPlayerMode(STATE.REMOVE);
        }
        this.toggleFunctionalButtons();
        this.inRemoveState = !this.inRemoveState;
    }

    /**
     * Reduce count of samples that not played yet
     */
    reduceRemainingSamples () {
        this.remainingSamplesCount--;
        if (this.remainingSamplesCount < 1) {
            this.setPlayerMode(STATE.PLAY);
        }
    };

    /**
     * Replay schedule with record
     */
    replaySchedule () {
        this.remainingSamplesCount = 0;
        this.startSchedule();

        this.sequences.forEach((sequence) => {
            // count number of sounds which should be played
            sequence.timings.forEach(soundNames => {
                this.remainingSamplesCount += soundNames.length;
            });
        });

        // fill context within nodes with timings
        this.player.playSoundsMaps(this.sequences, this.reduceRemainingSamples);
    }

    /**
     * Replay sequence by index
     */
    replaySequence(index) {
        const sequence = this.sequences[index];

        // fill context within nodes with timings
        this.player.playSoundsMap(sequence);
    }
}

export default Schedule;