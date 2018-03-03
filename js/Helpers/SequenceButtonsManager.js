/**
 * Manage sequence and set buttons
 */
class SequenceButtonsManager {
    /**
     * Add button to sequence or set container
     * @param containerClassName container name
     * @param buttonLabel label of creating button
     * @param callback callback on button clicking
     */
    static appendButton(containerClassName, buttonLabel, callback) {
        const creatingButton = document.createElement('button');
        creatingButton.className = 'timing-mark';
        creatingButton.onclick = callback;

        if (buttonLabel !== undefined && buttonLabel !== '') {
            creatingButton.textContent = buttonLabel;
        } else {
            console.error('Label of button could not be empty');
        }

        const timingsElement = document.getElementsByClassName(containerClassName);
        timingsElement[0].appendChild(creatingButton);
    }
}
