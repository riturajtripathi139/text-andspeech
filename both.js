document.addEventListener('DOMContentLoaded', () => {
    let speech = new SpeechSynthesisUtterance();
    let voices = [];
    const voiceSelect = document.querySelector("select");
    const textarea = document.querySelector("#textarea");

    // Populate the voice options
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        speech.voice = voices[0];

        // Clear previous options
        voiceSelect.innerHTML = '';

        voices.forEach((voice, i) => {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = voice.name;
            voiceSelect.appendChild(option);
        });
    };

    // Event listener for 'Listen' button
    document.querySelector("#listen").addEventListener("click", () => {
        speech.text = textarea.value;
        speech.voice = voices[voiceSelect.value]; // Select the voice
        window.speechSynthesis.speak(speech);
    });

    // Function for speech recognition (Speak button)
    let speaks = function() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join(''); // Combine all results into a single string

            textarea.value = transcript; // Set the transcript to the textarea
        });

        recognition.start();
    };

    document.querySelector("#speak").addEventListener('click', speaks);
});
