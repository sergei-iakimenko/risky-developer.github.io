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
            this.mode = 'play';
        }
        catch(e) {
            alert('Браузер не поддерживает web audio API');
        }
    }

    /**
     * Загружает буфер с бинарными данными трека в массив буферов.
     * @param {string} name Имя (алиас) загружаемой аудиозаписи
     * @param {string} url Расположение трека.
     */
    loadSound(name, url) {
        // self решает коллизию с текущими объектами this
        let self = this;
        fetch(url).then(function(response) {
            return response.arrayBuffer();
        }).then(function(buffer) {
            // Декодирует ответ, полученный в бинарном виде
            self.audioContext.decodeAudioData(buffer, function(decodedArrayBuffer) {
            self.buffers[name] = decodedArrayBuffer;
            });
        }).catch(function (err) {
            console.error(err);
        });
    }

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

    /**
     * Handle tap of pad set.
     * @param {String} tapName Name of sample of taped pad.
     */
    handleTap(tapName) {
        this.playSound(tapName);
        if (this.mode === 'record') {
            schedule.sequences[schedule.currentSequence].addTiming(tapName);
        }
    }
}