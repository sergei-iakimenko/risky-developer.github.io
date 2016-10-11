// Пути к аудиофайлам, биндящимся к кнопкам
var audioPaths = [
    'samples/recoded/crash 1 v9 rr1.wav'
    ,'samples/recoded/snare 3 v1 rr1.wav'
    ,'samples/recoded/snare 3 v3 rr1.wav'
    ,'samples/recoded/snare_oh 45.wav'
    ,'samples/recoded/Grv Clap 01.wav'
    ,'samples/recoded/Grv Clav 02.wav'
    ,'samples/recoded/Grv Kick Acoustic 01.wav'
    ,'samples/recoded/Pap CH.wav'
    ,'samples/recoded/Pap OH.wav'
    ,'samples/recoded/Toidiling Tom.wav'
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
            player.loadSound(audioPaths[i]);
        }
    } else {
        showErrorMessage('Неккоретная структура путей к аудиофайлам')
    }
};

initializeAudioElems(audioPaths);