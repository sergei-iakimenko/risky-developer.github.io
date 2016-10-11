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
                var btn = document.getElementById(track);
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

/**
 * Инициализирует обработку нажатия кнопки на странице.
 * @param {boolean} isUp Нажата/отпущена ли кнопка.
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

/**
 * Отображает сообщение об ошибке
 * @param {string} message - Текст сообщения.
 */
function showErrorMessage(message) {
    var div = document.createElement('div');
    div.id = 'error_message';
    div.className = 'alert alert-danger alert-dismissible fade in';
    div.setAttribute('role', 'alert');
    div.textContent = message;

    // Инициализирование кнопки закрытия сообщения
    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close';
    closeButton.setAttribute('data-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    div.appendChild(closeButton);

    // Добавление значка крестика
    var span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times';

    closeButton.appendChild(span);
    document.body.appendChild(div);
}

/**
 * @deprecated Теперь звук воспроизводится с помощью web audio API
 * Клонирует аудио-объект
 * @param {object} parentAudio - Копируемый объект
 */
function cloneAndPlay(parentAudio) {
    var childAudio = parentAudio.cloneNode();
    childAudio.play();

    // Удаление клона после окончания аудио
    childAudio.onended = function () {
        delete this;
    }
}

/**
 * @deprecated Теперь звук воспроизводится с помощью web audio API
 * Проверяет, проигрывается ли аудио в данный момент
 * @param {object} audio - Объект время которого будет сброшено.
 */
function isPlaying(audio) {
    return !audio.paused && !audio.ended && 0 < audio.currentTime;
}

/**
 * @deprecated Теперь звук воспроизводится с помощью web audio API
 * Проигрывает аудио по указанному идентификатору в DOM-е
 * @param {string} audioId - Идентификатор элемента аудио.
 */
function playAudio(audioId) {
    var myAudio = document.getElementById(audioId);
    if (isPlaying(myAudio)) {
        cloneAndPlay(myAudio);
    } else {
        myAudio.play().then((message) => console.log('was good:' + message),
            (message) => showErrorMessage('Something wrong: ' + message));
    }
}

// TODO: сделать обработчик на возможность воспроизведения, canPlayType()
// TODO: сделать реакцию на нажатие кнопок заданием атрибута accesskey
// Тогда можно будет воспроизводить файл по фокусу onfocus
// TODO: сделать проверку на загрузку файлов onplay/onerror. Файлы захостить на бесплатном хостинге

// TODO: использовать промисы для понимания, что можно играть