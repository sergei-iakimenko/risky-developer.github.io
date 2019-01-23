import { schedule } from "./main.js";

/** Event driven audio player **/
class SoundPlayer {
    constructor(audioPaths) {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.buffers = [];
            this.mode = 'play';
        }
        catch(e) {
            console.error("Browser don't supports Web Audio API");
        }

        // Creation of audio elements and binding them on sound paths
        if (audioPaths.length === 10) {
            for (let i = 0; i < audioPaths.length; i++) {
                this.loadSound(audioPaths[i].name, audioPaths[i].path);
            }
        } else {
            console.error('Incorrect path structure to audio files');
        }
    }

    /**
     * @returns {number} Current time of the audio context
     */
    get currentTime() {
        return this.audioContext.currentTime;
    }

    /**
     * Load buffer of track's binary data to buffer array
     * @param {string} name Name (alias) of loading audio
     * @param {string} url URL of file hosting.
     */
    loadSound(name, url) {
        fetch(url).then(function(response) {
            return response.arrayBuffer();
        }).then((buffer) => {
            this.audioContext.decodeAudioData(buffer, (decodedArrayBuffer) => {
            this.buffers[name] = decodedArrayBuffer;
            });
        }).catch(function (err) {
            console.error(err);
        });
    }

    /**
     * Play chosen track with delay
     * @param {String} bufferName Name of track.
     * @param {number} delayTime delay time of current context
     * @param endHandler handle end source play
     */
    playSound(bufferName, delayTime = 0, endHandler) {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffers[bufferName];
        source.connect(this.audioContext.destination);

        source.onended = endHandler;

        source.start(this.currentTime + delayTime);
    }

    playSoundsMap(timingsMap, endHandler) {
        for (const [time, names] of timingsMap.timings) {
            names.forEach(soundName => {
                this.playSound(soundName, time, endHandler);
            });
        }
    }

    /**
     * Play sounds of array of maps
     * @param {Array} maps
     * @param {function} endHandler handler of playing end
     */
    playSoundsMaps(maps, endHandler) {
        maps.forEach(timingsMap => {
            this.playSoundsMap(timingsMap, endHandler);
        });
    }

    /**
     * Handle tap of pad set.
     * @param {String} tapName Name of sample of taped pad
     * @param {function} removeButton Remove buttons
     */
    handleTap(tapName, removeButton) {
        if (this.mode === 'record') {
            this.playSound(tapName);
            schedule.currentSequence.addTiming(tapName, schedule.currentTime);
        } else if (this.mode === 'remove') {
            removeButton();
            schedule.currentSequence.removeTiming(tapName, schedule.currentTime);
        } else if (this.mode === 'play') {
            this.playSound(tapName);

        }
    }
}

export default SoundPlayer