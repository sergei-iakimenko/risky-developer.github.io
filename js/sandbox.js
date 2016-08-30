// Проигрывание аудио на кнопку при фокусировании на wonderful_div
/*var lDiv = document.getElementById("wonderful_div");
 lDiv.addEventListener("keydown", function(event) {
 event.preventDefault();
 if (event.keyCode == 13) {
 document.getElementById("play_button").click();
 }
 });*/



/**
 * Сбрасывает время проигрываемого audio
 * @param {object} audio - Объект время которого будет сброшено.
 */
function resetCurrentTime(audio) {
    audio.currentTime = 0;
}