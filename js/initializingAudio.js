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

/**
 * Создаёт элементы аудио и биндит их к путям файлов
 * @param {string[]} audioPaths - Пути к файлам.
 */
function initializeAudioElems(audioPaths) {
    if (audioPaths.length === 10) {
        for (let i = 0; i < audioPaths.length; i++) {
            let audioElement = document.createElement('audio');

            // TODO: определиться с именованием имён кнопок
            audioElement.id = 'audio' + i;
            audioElement.src = audioPaths[i];
            audioElement.setAttribute('type', 'audio/mp3');
            audioElement.preload = 'auto';
            document.body.appendChild(audioElement);
        }
    } else {
        showErrorMessage('Неккоретная структура путей к аудиофайлам')
    }
}

initializeAudioElems(audioPaths);