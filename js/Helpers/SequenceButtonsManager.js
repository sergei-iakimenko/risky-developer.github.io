/**
 * Manage sequence and set buttons
 */
class SequenceButtonsManager {
    /**
     * Add button to sequence or set container
     * @param containerClassName container name
     * @param buttonLabel label of creating button
     */
    static appendButton(containerClassName, buttonLabel) {
        const creatingButton = document.createElement('button');
        creatingButton.className = 'timing-mark';

        if (buttonLabel !== undefined && buttonLabel !== '') {
            creatingButton.textContent = buttonLabel;
        } else {
            console.error('Label of button could not be empty');
        }

        const timingsElement = document.getElementsByClassName(containerClassName);
        timingsElement[0].appendChild(creatingButton);
    }
}
