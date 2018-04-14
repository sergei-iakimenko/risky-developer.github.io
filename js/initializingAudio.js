// Paths to audio files, which bind to buttons
export const audioPaths = [
    {name: '0audio', path: 'samples/recoded/crash 1 v9 rr1.wav'}
    ,{name: '1audio', path: 'samples/recoded/snare 3 v1 rr1.wav'}
    ,{name: '2audio', path: 'samples/recoded/snare 3 v3 rr1.wav'}
    ,{name: '3audio', path: 'samples/recoded/snare_oh 45.wav'}
    ,{name: '4audio', path: 'samples/recoded/Grv Clap 01.wav'}
    ,{name: '5audio', path: 'samples/recoded/Grv Clav 02.wav'}
    ,{name: '6audio', path: 'samples/recoded/Grv Kick Acoustic 01.wav'}
    ,{name: '7audio', path: 'samples/recoded/Pap CH.wav'}
    ,{name: '8audio', path: 'samples/recoded/Pap OH.wav'}
    ,{name: '9audio', path: 'samples/recoded/Toidiling Tom.wav'}
];

// Initializing of audio events
export const pushButtonEvent = new CustomEvent("pushButton", {
    detail: {}
});

/**
 * Handle tap button
 * @param {object} event - Emitted by tap button event
 */
const handlePushButton = event => {
    event.detail.buttonObject.classList.toggle('pad_active', event.detail.isUp);

    if (event.detail.isUp) {
        event.detail.buttonObject.click();
    }
};

// Binding tap button to related event
document.addEventListener('pushButton', handlePushButton);

// Buttons' set initialization
export const functionalButtonsSet = new Map();
functionalButtonsSet.addButtons = function(keys) {
    if (Array.isArray(keys)) {
        keys.forEach((item) => {
            this.set(item, {
                buttonObject: document.getElementById(item)
            })
        })
    } else {
        console.error('Check if keys argument is Array');
    }
};
functionalButtonsSet.addButtons(['Enter', '+', '.']);
