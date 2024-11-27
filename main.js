/*
1. Lag et tilfeldig nummer mellom 1-100
2. Ta inn user input
3. Konverter user input fra string til number
4. Legg til item i ul (answers)
5. Sjekk om user input er høyere/lavere/lik tilfeldig nummer
*/

let randomNumber = 0;
let tries = 0;

function generateRandomNumber(min, max) {
  randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
}

generateRandomNumber(1, 100);
console.log(randomNumber);

function convertStringToNumber(str) {
  return Number(str);
}

function addLiToAnswersList(str) {
  const answersList = document.querySelector("#previousAnswers");
  const text = document.createElement("li");
  text.textContent = str;
  answersList.prepend(text);
}

function guessNumber() {
  const inputElement = document.querySelector("#numberInput");
  const inputValue = convertStringToNumber(inputElement.value);

  tries++;
  if (randomNumber == inputValue) {
    addLiToAnswersList(
      `${inputValue} is the correct number! You did it in ${tries} tries, YIPPEE!.`
    );

    const firstItem = document.querySelector("#previousAnswers li");
    firstItem.classList.add("bounce");

    let fanFare = new Audio("assets/fanfare.mp3");
    fanFare.play();

    let fireworks = document.getElementsByClassName("firework");
    for (let i = 0; i < fireworks.length; i++) {
      fireworks[i].style.visibility = "visible";
    }
  } else if (inputValue > randomNumber) {
    addLiToAnswersList(`\\/ ${inputValue}`);
  } else {
    addLiToAnswersList(`/\\ ${inputValue}`);
  }

  inputElement.value = "";
}

// Event listener som gjør at man kan trykke enter i stedet for å trykke på knappen
let enterSubmit = document.getElementById("numberInput");

enterSubmit.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("numberInputButton").click();
  }
});

function resetGame() {
  tries = 0;
  generateRandomNumber(1, 100);

  let fireworks = document.getElementsByClassName("firework");
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].style.visibility = "hidden";
  }

  let answersList = document.querySelectorAll("#previousAnswers li");
  for (let i = 0; i < answersList.length; i++) {
    answersList[i].remove();
  }

  const inputElement = document.querySelector("#numberInput");
  inputElement.value = "";
}
