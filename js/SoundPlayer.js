'use strict';

/** Класс представляет событийный проигрыватель звуков. */
class SoundPlayer {
    /**
     * Создаёт экземпляр объекта плеера.
     */
    constructor() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.buffers = [];
        }
        catch(e) {
            alert('Браузер не поддерживает web audio API');
        }
    }

    /**
     * Загружает буфер с бинарными данными трека в массив буферов.
     * @param {string} url message {string} Расположение трека.
     */
    loadSound(name, url) {
        // Запрос трека с сервера
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        // self решает коллизию с текущими объектами this
        let self = this;
        xhr.onload = function(e) {
            // Декодирует ответ, полученный в бинарном виде
            self.audioContext.decodeAudioData(this.response,
                function(decodedArrayBuffer) {
                    // Добавление декодированного буфера в свойство-массив буферов
                    self.buffers[name] = decodedArrayBuffer;
                }, function(e) {
                    console.log('Error decoding file', e);
                });
        };
        xhr.send();
    };

    /**
     * Проигрывает выбранный трек.
     * @param {String} bufferName Заданное имя проигрываемого трека в свойстве-массиве буферов.
     */
    playSound(bufferName) {
        let anotherSource = this.audioContext.createBufferSource();
        anotherSource.buffer = this.buffers[bufferName];
        anotherSource.connect(this.audioContext.destination);

        // После проигрывания источник звука нельзя использовать
        // Не доверяй сборщику мусора :/
        anotherSource.onended = function() {
            delete this;
        };

        anotherSource.start();
    }
}