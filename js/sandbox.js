// Черновик предварительной загрузки буфера сэмплов
// TODO: дописать и реализовать работу с массивом буферов как с ассоциативным массивом
class fooPlayer
{
    loadSound(url)
    {
        // Request of track from server
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        // resolve collision of this
        let self = this;
        xhr.onload = function (e) {
            // Decode binary answer
            self.audioContext.decodeAudioData(this.response,
                function (decodedArrayBuffer) {
                    // Push decoded buffer to buffers array property
                    self.buffers.push(decodedArrayBuffer);

                    // source creation
                    let source = [self.audioContext.createBufferSource()];
                    source[0].buffer = decodedArrayBuffer;
                    source[0].connect(self.audioContext.destination);

                    source[0].onstart = function () {
                        let anotherSource = self.audioContext.createBufferSource();
                        anotherSource.buffer = decodedArrayBuffer;
                        anotherSource.connect(self.audioContext.destination);
                        self.sources[self.sources.length - 1].push(source);
                    };
                    source[0].onended = function () {
                        delete this;
                    };


                    self.sources.push(source);
                }, function (e) {
                    console.log('Error decoding file', e);
                });
        };
        xhr.send();
    }
    ;

    /**
     * Play chosen track.
     * @return {number} Index of track in buffers array property.
     */
    playSound(i)
    {
        // Для this.sources[i][this.sources[i].length - 1] Должен быть хэндлер для onended: delete this
        // Для onstart this.sources[i][this.sources[i].length - 1] должен быть обработчик: Создать anotherSource и добавить в this.sources[i]
        // Проиграть this.sources[i][this.sources[i].length - 1];

        // Может быть разреженный массив? Плохо?

        /*let self = this;
         this.sources[i].onended = function () {
         let source = self.audioContext.createBufferSource();
         source.buffer = self.buffers[i];
         source.connect(self.audioContext.destination);

         // self.sources[i] или this?
         self.sources[i].push(source)
         };
         this.sources[i].start();*/


        this.sources[i][this.sources.length - 1].start();

        let self = this;
        this.sources[i][this.sources.length - 1].onstart.addEventListener =
            () => {
                let anotherSource = self.audioContext.createBufferSource();
                anotherSource.buffer = decodedArrayBuffer;
                anotherSource.connect(self.audioContext.destination);
                self.sources[i][self.sources[i].length - 1].push(source);

                self.sources[i][self.sources[i].length - 1].onstart = function () {
                    let anotherSource = self.audioContext.createBufferSource();
                    anotherSource.buffer = decodedArrayBuffer;
                    anotherSource.connect(self.audioContext.destination);
                    self.sources[self.sources.length - 1].push(source);
                };
                self.sources[i][self.sources[i].length - 1].onended = function () {
                    delete this;
                };
            };

        /*let anotherSource = this.audioContext.createBufferSource();
         anotherSource.buffer = this.buffers[i];
         anotherSource.connect(this.audioContext.destination);

         // After end no need in
         // No trust for garbage collector :/
         anotherSource.onended = function() {
         delete this;
         };

         anotherSource.start();*/
    }
}