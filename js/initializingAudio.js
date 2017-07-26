// Пути к аудиофайлам, биндящимся к кнопкам
const audioPaths = [
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

// Инициализация событий аудио
const pushButtonEvent = new CustomEvent("pushButton", {
    detail: {}
});

/**
 * Обрабатывает нажатие кнопок
 * @param {object} event - Событие вызванное нажатием кнопки.
 */
const handlePushButton = event => {
    event.detail.buttonObject.classList.toggle('active', event.detail.isUp);

    if (event.detail.isUp) {
        event.detail.buttonObject.click();
    }
};

// Привязка к событию нажатия кнопки обработчика
document.addEventListener('pushButton', handlePushButton);

// Создание экземпляра одъекта проигрывателя
const player = new SoundPlayer();

/**
 * Создаёт элементы аудио и биндит их к путям файлов
 * @param {string[]} audioPaths - Пути к файлам.
 */
const initializeAudioElems = audioPaths => {
    if (audioPaths.length === 10) {
        for (let i = 0; i < audioPaths.length; i++) {
            player.loadSound(audioPaths[i].name, audioPaths[i].path);
        }
    } else {
        showErrorMessage('Неккоретная структура путей к аудиофайлам')
    }
};

initializeAudioElems(audioPaths);