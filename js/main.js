// Контейнер с данными о кнопках
const buttons = [];

/**
 * Создаёт элемент массива с данными о нажимаемой кнопке.
 * @param {string} track Расположение трека.
 * @param {Array} keys Ключи, связанные с кодом нажатия клавиш в разных операционных системах.
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
            // Защита от повторного проигрования из-за auto-repeat-а
            if (isUp !== value) {
                isUp = value;
                const btn = document.getElementById(track);
                if (!btn) {
                    return;
                }

                // Инициализация проигрывания
                pushButtonEvent.detail.isUp = isUp;
                pushButtonEvent.detail.buttonObject = btn;

                // Да пошло оно всё в handlePushButton
                document.dispatchEvent(pushButtonEvent);
            }
        }
    });
};

/**
 * Находит данные нажатой кнопки в массиве кнопок.
 * @param {number} keyCode Код кнопки.
 */
const findAudioButton = keyCode => {
    return buttons.find(item => item.keys.indexOf(keyCode) !== -1);
};

const handleFunctionalButton = keyCode => {
    // TODO: implement , (replay) handling. Also it's about all functional buttons
};

/**
 * Инициализирует обработку нажатия кнопки на странице.
 * @param {boolean} isUp Нажата/отпущена ли кнопка.
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

// TODO: сделать обработчик на возможность воспроизведения, canPlayType()
// TODO: сделать реакцию на нажатие кнопок заданием атрибута accesskey
// Тогда можно будет воспроизводить файл по фокусу onfocus
// TODO: сделать проверку на загрузку файлов onplay/onerror. Файлы захостить на бесплатном хостинге