/* =========================================
   WANIYA ENGLISH TEACHER AI
   STEP 1 — VOICE SYSTEM
========================================= */

const startBtn = document.getElementById("startBtn");
const speechBox = document.querySelector(".speech-box");
const speechText = speechBox.querySelector("p");
const speechTitle = speechBox.querySelector("strong");

/* =========================================
   SPEECH RECOGNITION
========================================= */

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;

if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;


  /* =========================
     START
  ========================= */

  recognition.onstart = function () {

    isListening = true;

    startBtn.innerHTML = `
      <span class="mic-icon">🔴</span>
      <span>Listening...</span>
    `;

    speechTitle.textContent = "I'm listening 👂";

    speechText.textContent =
      "Speak something in English...";

  };


  /* =========================
     RESULT
  ========================= */

  recognition.onresult = function (event) {

    const transcript =
      event.results[0][0].transcript;

    speechTitle.textContent =
      "You said 🗣️";

    speechText.textContent =
      `"${transcript}"`;

    console.log("User:", transcript);

    /*
      अभी सिर्फ आपकी आवाज़
      को text में बदल रहे हैं।

      अगले step में इसी text को
      AI English Teacher से check करवाएँगे।
    */

    speakWaniya(
      "Good job! I heard you."
    );

  };


  /* =========================
     END
  ========================= */

  recognition.onend = function () {

    isListening = false;

    startBtn.innerHTML = `
      <span class="mic-icon">🎤</span>
      <span>Start Speaking</span>
    `;

  };


  /* =========================
     ERROR
  ========================= */

  recognition.onerror = function (event) {

    console.log(
      "Microphone error:",
      event.error
    );

    isListening = false;

    startBtn.innerHTML = `
      <span class="mic-icon">🎤</span>
      <span>Start Speaking</span>
    `;

    speechTitle.textContent =
      "Oops! 😕";

    speechText.textContent =
      "Please allow microphone permission and try again.";

  };

}


/* =========================================
   START BUTTON
========================================= */

startBtn.addEventListener("click", function () {

  if (!recognition) {

    speechTitle.textContent =
      "Browser not supported";

    speechText.textContent =
      "Please open WANIYA in Chrome.";

    return;

  }


  if (isListening) {

    recognition.stop();

    return;

  }


  try {

    recognition.start();

  } catch (error) {

    console.log(error);

  }

});


/* =========================================
   WANIYA VOICE
========================================= */

function speakWaniya(text) {

  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const voice =
    new SpeechSynthesisUtterance(text);

  voice.lang = "en-US";

  voice.rate = 0.95;

  voice.pitch = 1.05;

  voice.volume = 1;

  window.speechSynthesis.speak(voice);

}


/* =========================================
   SETTINGS BUTTON
========================================= */

const settingsBtn =
  document.getElementById("settingsBtn");

settingsBtn.addEventListener("click", function () {

  speechTitle.textContent =
    "WANIYA Settings ⚙️";

  speechText.textContent =
    "Settings will be available soon.";

});
