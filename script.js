
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");


function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "en-US";
    window.speechSynthesis.speak(textSpeak);
}

function greetUser() {

    let name = prompt("Hi! What's your name?");
    if (!name) {
        name = "User";
    }

    let hours = new Date().getHours();
    let greeting;

    if (hours >= 0 && hours < 12) {
        greeting = `Good Morning ${name}!`;
    } else if (hours >= 12 && hours < 16) {
        greeting = `Good Afternoon ${name}!`;
    } else {
        greeting = `Good Evening ${name}!`;
    }
    speak(`Hello, ${greeting} What can I help you with today?`);
}
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};
btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});
function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";
   
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! What can I help you with?");
    } else if (message.includes("who are you?")) {
        speak("I am  Speakiee, your virtual assistant, here to help with any questions.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("what's the time")) {
        speak(`The time is ${getTime()}`);
    } else if (message.includes("what's the date")) {
        speak(`Today's date is ${getDate()}`);
    } else if (message.includes("calculate")) {
        performCalculation(message);
    } else {
        let searchQuery = message.trim();
        speak(`Here is what I found on the internet for ${searchQuery}`);
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    }
}


function getTime() {
    return new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
}


function getDate() {
    return new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}


function performCalculation(message) {
    let operation = message
        .replace("calculate", "")
        .replace("plus", "+")
        .replace("minus", "-")
        .replace("times", "*")
        .replace("multiplied by", "*")
        .replace("divided by", "/")
        .replace("x", "*") 
        .replace("by", "/")
        .trim();

    try {
        let result = eval(operation);
        if (!isNaN(result)) {
            speak(`The result is ${result}`);
        } else {
            throw new Error("Invalid calculation");
        }
    } catch {
        speak("Sorry, I couldn't perform the calculation. Please try again.");
    }
}


window.onload = greetUser;
