// Container with button's data
const buttons = [];

/**
 * Create array element with data of tapped button
 * @param {string} track Button's id
 * @param {Array} keys Key codes of tapped button in different OS
 */
const createAudioButton = (track, keys) => {
    let isUp = false;
    buttons.push({
        track: track,
        keys: keys,
        get isUp() {
            return isUp;
        },
        set isUp(value) {
            // Prevent repeat because of auto-repeat
            if (isUp !== value) {
                isUp = value;

                const btn = document.getElementById(track);
                if (!btn) {
                    return;
                }

                // Run playing
                pushButtonEvent.detail.isUp = isUp;
                pushButtonEvent.detail.buttonObject = btn;

                document.dispatchEvent(pushButtonEvent);
            }
        }
    });
};

/**
 * Find data of tapped button in array of buttons
 * @param {number} keyCode Button's code
 */
const findAudioButton = keyCode => {
    return buttons.find(item => item.keys.indexOf(keyCode) !== -1);
};

const handleFunctionalButton = keyCode => {
    // TODO: implement , (replay) handling. Also it's about all functional buttons
};

/**
 * Initialize handling of tap button
 * @param {boolean} isUp Pressed/keydown
 * @param {object} event Tap pad event
 */
const buttonListener = (isUp, event) => {
    const audioButton = findAudioButton(event.keyCode);

    if (audioButton) {
        event.preventDefault();
        audioButton.isUp = isUp;
    }
};

document.addEventListener('keydown', buttonListener.bind(null, true));
document.addEventListener('keyup', buttonListener.bind(null, false));

createAudioButton('play_button0', [96, 48]);

createAudioButton('play_button1', [97, 49]);
createAudioButton('play_button2', [98, 50]);
createAudioButton('play_button3', [99, 51]);

createAudioButton('play_button4', [100, 52]);
createAudioButton('play_button5', [101, 53]);
createAudioButton('play_button6', [102, 54]);

createAudioButton('play_button7', [103, 55]);
createAudioButton('play_button8', [104, 56]);
createAudioButton('play_button9', [105, 57]);