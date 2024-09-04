// Adding the Function of Text to Speech

let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)))
};

document.querySelector("#listen").addEventListener("click",  () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);

})
// Adding the Function of Speech to Text 
let speaks = function() {
    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join(''); // Combine all results into a single string

        document.querySelector("#textarea").value = transcript; // Set the transcript to the textarea
    });

    if (speech == true) {
        recognition.start();
    }
}

document.querySelector("#speak").addEventListener('click', speaks);

//Adding a clear button
document.querySelector("#Clear").addEventListener('click', () => {
    document.querySelector("#textarea").value = "";
});