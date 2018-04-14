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
     * Play chosen track
     * @param {String} bufferName Name of track.
     */
    playSound(bufferName) {
        let source = this.audioContext.createBufferSource();
        source.buffer = this.buffers[bufferName];
        source.connect(this.audioContext.destination);

        // Delete source after play ending
        source.onended = function() {
            delete this;
        };
        source.start();
    }

    /**
     * Handle tap of pad set.
     * @param {String} tapName Name of sample of taped pad.
     */
    handleTap(tapName) {
        this.playSound(tapName);
        if (this.mode === 'record') {
            // TODO: replace getTimeLeft to public method
            schedule.currentSequence.addTiming(tapName, schedule.getTimeLeft());
        }
    }
}

export default SoundPlayer