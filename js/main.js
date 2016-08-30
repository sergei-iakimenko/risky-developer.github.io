// TODO: Вынести в отдельный объект
var buttonSet = [];
buttonSet[96]= {'btnName': 'play_button0', 'btnCode': '96', 'isUp': false};

buttonSet[97]= {'btnName': 'play_button1', 'btnCode': '97', 'isUp': false};
buttonSet[98]= {'btnName': 'play_button2', 'btnCode': '98', 'isUp': false};
buttonSet[99]= {'btnName': 'play_button3', 'btnCode': '99', 'isUp': false};

buttonSet[100]= {'btnName': 'play_button4', 'btnCode': '100', 'isUp': false};
buttonSet[101]= {'btnName': 'play_button5', 'btnCode': '101', 'isUp': false};
buttonSet[102]= {'btnName': 'play_button6', 'btnCode': '102', 'isUp': false};

buttonSet[103]= {'btnName': 'play_button7', 'btnCode': '103', 'isUp': false};
buttonSet[104]= {'btnName': 'play_button8', 'btnCode': '104', 'isUp': false};
buttonSet[105]= {'btnName': 'play_button9', 'btnCode': '105', 'isUp': false};

// Проигрывание аудио на кнопку при фокусировании на wonderful_div
var lDiv = document.getElementById("main");
lDiv.addEventListener("keydown", function (event) {
    // Предотвращение обработки браузером назначенных комбинаций клавиш
    event.preventDefault();

    if (!buttonSet[event.keyCode].isUp) {
        buttonSet[event.keyCode].isUp = true;
        var btn = document.getElementById(buttonSet[event.keyCode].btnName);
        btn.classList.toggle('active');

        btn.click();
    }
});

lDiv.addEventListener("keyup", function (event) {
    // Предотвращение обработки браузером назначенных комбинаций клавиш
    event.preventDefault();
    buttonSet[event.keyCode].isUp = false;

    let btn = document.getElementById( buttonSet[event.keyCode].btnName);
    btn.classList.toggle('active');
});

lDiv.focus();

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
 * Проверяет, проигрывается ли аудио в данный момент
 * @param {object} audio - Объект время которого будет сброшено.
 */
function isPlaying(audio) {
    return !audio.paused && !audio.ended && 0 < audio.currentTime;
}

/**
 * Проигрывает аудио по указанному идентификатору в DOM-е
 * @param {string} audioId - Идентификатор элемента аудио.
 */
function playAudio(audioId) {
    var myAudio = document.getElementById(audioId);
    if (isPlaying(myAudio)) {
        cloneAndPlay(myAudio);
    } else {
        myAudio.play().then((message) => console.log("was good:" + message),
            (message) => showErrorMessage("Something wrong: " + message));
    }
}

/**
 * @deprecated Может что-то в этом есть. Пригодится
 */
function handleKeyPress(event) {
    if (event.which != 0 && event.charCode != 0) { // все кроме IE
        if (event.which === 48) {
            //let sample = new HTMLAudioElement("azaza.wav");
            //var myAudio = new Audio();        // create the audio object
            //myAudio.src = "http://drd.fm/get/679115/ras_beats/control_your_own/02-wit_no_pressure_(feat._roc_marciano).mp3"; // assign the audio file to it
            var myAudio = document.getElementById('myAudio');

            if (isPlaying(myAudio)) {
                cloneAndPlay(myAudio);
            } else {
                //myAudio.src = "drum_mp3.mp3";
                myAudio.play().then((message) => console.log("was good:" + message),
                    (message) => showErrorMessage("Something wrong: " + message));
            }
        } else if (event.which === 49) {
            var myAudio = document.getElementById('myAudio1');
            //myAudio.src = "crash_mp3.mp3";
            myAudio.play().then((message) => console.log("was good" + message),
                (message) => showErrorMessage("Something wrong: " + message));
        }
    }
}

// TODO: сделать обработчик на возможность воспроизведения, canPlayType()
// TODO: сделать реакцию на нажатие кнопок заданием атрибута accesskey
// Тогда можно будет воспроизводить файл по фокусу onfocus
// TODO: сделать проверку на загрузку файлов onplay/onerror. Файлы захостить на бесплатном хостинге

// TODO: использовать промисы для понимания, что можно играть