/* =========================================
   WANIYA ENGLISH TEACHER AI
   STEP 2 — SMART ENGLISH CORRECTION
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
      event.results[0][0].transcript.trim();

    console.log("User:", transcript);

    speechTitle.textContent = "You said 🗣️";

    speechText.textContent =
      `"${transcript}"`;

    /* Check English */
    checkEnglish(transcript);

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

    speechTitle.textContent = "Oops! 😕";

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
   SMART ENGLISH CHECKER
========================================= */

function checkEnglish(sentence) {

  const original = sentence.trim();

  const lower = original.toLowerCase();

  let corrected = original;
  let explanation = "";
  let isWrong = false;


  /* =========================
     COMMON MISTAKES
  ========================= */

  if (lower === "i am go to market") {

    corrected =
      "I am going to the market.";

    explanation =
      "Hindi: 'I am go' ki jagah 'I am going' bolna chahiye.";

    isWrong = true;

  }


  else if (lower === "i am go market") {

    corrected =
      "I am going to the market.";

    explanation =
      "Hindi: 'I am going' ke baad place ke saath 'the' lagana natural hai.";

    isWrong = true;

  }


  else if (lower === "i am fine how are you") {

    corrected =
      "I am fine. How are you?";

    explanation =
      "Ye sentence sahi hai. Bas do sentences ko alag bolna better hai.";

  }


  else if (lower === "my name sahil") {

    corrected =
      "My name is Sahil.";

    explanation =
      "Hindi: 'My name' ke baad 'is' lagta hai.";

    isWrong = true;

  }


  else if (lower === "i am student") {

    corrected =
      "I am a student.";

    explanation =
      "Hindi: Singular countable noun 'student' se pehle 'a' lagta hai.";

    isWrong = true;

  }


  else if (lower === "i like play cricket") {

    corrected =
      "I like playing cricket.";

    explanation =
      "Hindi: 'like' ke baad activity ke liye 'playing' use karna natural hai.";

    isWrong = true;

  }


  else if (lower === "he go to school") {

    corrected =
      "He goes to school.";

    explanation =
      "Hindi: He/She/It ke saath present tense mein verb mein 's' ya 'es' lagta hai.";

    isWrong = true;

  }


  else if (lower === "she go to market") {

    corrected =
      "She goes to the market.";

    explanation =
      "Hindi: 'She' ke saath 'goes' use hota hai.";

    isWrong = true;

  }


  /* =========================
     GREETING
  ========================= */

  else if (
    lower === "hello" ||
    lower === "hi" ||
    lower === "hello waniya" ||
    lower === "hi waniya"
  ) {

    corrected =
      "Hello! How are you today?";

    explanation =
      "WANIYA: Great! Let's practice English together.";

    speechTitle.textContent =
      "WANIYA says 👩‍🏫";

    speechText.textContent =
      corrected;

    speakWaniya(
      "Hello! How are you today?"
    );

    return;

  }


  /* =========================
     NORMAL SENTENCE
  ========================= */

  else {

    speechTitle.textContent =
      "Good English! 🌟";

    speechText.textContent =
      "Great! I understood you. Keep speaking English.";

    speakWaniya(
      "Great! I understood you. Keep speaking English."
    );

    return;

  }


  /* =========================
     SHOW CORRECTION
  ========================= */

  if (isWrong) {

    speechTitle.textContent =
      "Let's correct it 👩‍🏫";

    speechText.innerHTML =
      `<strong>Correct:</strong> ${corrected}<br><br>
       ${explanation}`;

    speakWaniya(
      "A better way to say it is: " +
      corrected
    );

  } else {

    speechTitle.textContent =
      "Good English! 🌟";

    speechText.innerHTML =
      `<strong>Correct:</strong> ${corrected}<br><br>
       ${explanation}`;

    speakWaniya(
      "Good job! " + corrected
    );

  }

}


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

if (settingsBtn) {

  settingsBtn.addEventListener("click", function () {

    speechTitle.textContent =
      "WANIYA Settings ⚙️";

    speechText.textContent =
      "Settings will be available soon.";

  });

       }
