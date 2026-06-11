let energy = 50;
let rocketPosition = 20;
let rocketY = 120;
let currentQuestion = 0;
let gameComplete = false;
let currentMission = 1;

let asteroid1X = 250;
let asteroidDirection = 1;
let obstacle2Y = 230;
let obstacle2Direction = 1;
let obstacle3Y = 90;
let obstacle3Direction = 1;
let obstacle4X = 540;
let obstacle4Direction = 1;
let obstacle5X = 680;
let obstacle5Direction = 1;

const finishLine = 650;

const missionQuestions = {
  1: [
    {
      question: "What is thrust?",
      A: "The force that pushes the rocket upward",
      B: "The weight of the rocket",
      C: "Air resistance",
      correct: "A"
    },
    {
      question: "What does drag do?",
      A: "Makes the rocket faster",
      B: "Slows the rocket down",
      C: "Adds fuel",
      correct: "B"
    },
    {
      question: "What does mass mean?",
      A: "How heavy the rocket is",
      B: "How bright the rocket is",
      C: "How much air is outside",
      correct: "A"
    },
    {
  question: "What happens when thrust is greater than weight?",
  A: "The rocket rises",
  B: "The rocket falls",
  C: "Nothing changes",
  correct: "A"
},
{
  question: "What force pulls the rocket back toward Earth?",
  A: "Drag",
  B: "Gravity",
  C: "Thrust",
  correct: "B"
},
{
  question: "What does drag come from?",
  A: "Air resistance",
  B: "Fuel",
  C: "The engine",
  correct: "A"
},
{
  question: "What does fuel help create?",
  A: "Gravity",
  B: "Thrust",
  C: "Mass",
  correct: "B"
},
{
  question: "What happens if a rocket has more mass?",
  A: "It is harder to accelerate",
  B: "It instantly flies faster",
  C: "It loses gravity",
  correct: "A"
},
{
  question: "What is the purpose of a rocket engine?",
  A: "Create thrust",
  B: "Increase gravity",
  C: "Create air",
  correct: "A"
},
{
  question: "Why do rockets need fuel?",
  A: "To produce thrust",
  B: "To make drag",
  C: "To increase weight",
  correct: "A"
}

  ],

  2: [
    {
      question: "Why does a rocket need stability?",
      A: "To stay controlled during flight",
      B: "To make fuel heavier",
      C: "To create more drag",
      correct: "A"
    },
    {
      question: "Which design would usually reduce drag?",
      A: "A wide, flat rocket",
      B: "A smooth, narrow rocket",
      C: "A rocket with extra bumps",
      correct: "B"
    },
    {
      question: "What happens if drag is too high?",
      A: "The rocket slows down",
      B: "The rocket gets more fuel",
      C: "The rocket becomes weightless",
      correct: "A"
    },
    {
  question: "Why should spacecraft avoid asteroids?",
  A: "They can damage the spacecraft",
  B: "They make the spacecraft faster",
  C: "They provide fuel",
  correct: "A"
},
{
  question: "What is an asteroid?",
  A: "A rocky object in space",
  B: "A type of rocket",
  C: "A space station",
  correct: "A"
},
{
  question: "What happens if a spacecraft collides with an asteroid?",
  A: "It may be damaged",
  B: "It gains fuel",
  C: "It becomes faster",
  correct: "A"
},
{
  question: "What is the safest way through an asteroid field?",
  A: "Careful navigation",
  B: "Flying blindly",
  C: "Turning off the engines",
  correct: "A"
},
{
  question: "What do astronauts use to track objects in space?",
  A: "Sensors and computers",
  B: "Magic",
  C: "Compasses only",
  correct: "A"
},
{
  question: "What is space debris?",
  A: "Human-made objects left in space",
  B: "Clouds",
  C: "Fuel",
  correct: "A"
},
{
  question: "Why is space debris dangerous?",
  A: "It can collide with spacecraft",
  B: "It creates gravity",
  C: "It makes rockets heavier",
  correct: "A"
},
{
  question: "What does navigation help a spacecraft do?",
  A: "Find a safe path",
  B: "Create fuel",
  C: "Increase gravity",
  correct: "A"
},
{
  question: "What should a pilot do when an obstacle is ahead?",
  A: "Steer around it",
  B: "Ignore it",
  C: "Speed straight into it",
  correct: "A"
},
{
  question: "Why are obstacle courses useful for astronaut training?",
  A: "They build navigation skills",
  B: "They create oxygen",
  C: "They increase gravity",
  correct: "A"
}
  ]
};

function getQuestions() {
  return missionQuestions[currentMission];
}

function updateScreen() {
  document.getElementById("energy").innerHTML =
    "<b>Energy:</b> " + energy + " ⚡";

  document.getElementById("academy-rocket").style.left =
    rocketPosition + "px";

  document.getElementById("academy-rocket").style.top =
    rocketY + "px";
}

function loadQuestion() {
  const questions = getQuestions();
  const box = document.getElementById("question-box");

  box.style.display = "block";

  document.getElementById("question-text").innerHTML =
    questions[currentQuestion].question;

  document.getElementById("choiceA").innerHTML =
    "A. " + questions[currentQuestion].A;

  document.getElementById("choiceB").innerHTML =
    "B. " + questions[currentQuestion].B;

  document.getElementById("choiceC").innerHTML =
    "C. " + questions[currentQuestion].C;

  document.getElementById("academy-message").innerHTML =
    "Answer the question to earn more energy.";
}

function answerQuestion(choice) {
  const questions = getQuestions();

  if (choice === questions[currentQuestion].correct) {
    energy += 40;
    document.getElementById("academy-message").innerHTML =
      "✅ Correct! +40 energy.";
  } else {
    document.getElementById("academy-message").innerHTML =
      "❌ Not quite.";
  }

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    currentQuestion = 0;
  }

  document.getElementById("question-box").style.display = "none";

  updateScreen();
}

function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.right < bRect.left ||
    aRect.left > bRect.right ||
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom
  );
}

function checkMission2Obstacles() {
  const rocket = document.getElementById("academy-rocket");
  const obstacles = document.querySelectorAll(".mission2-obstacle");

  obstacles.forEach(function(obstacle) {
    if (isTouching(rocket, obstacle)) {
      energy -= 10;

      rocketPosition = 20;
      rocketY = 120;

      document.getElementById("academy-message").innerHTML =
        "💥 Asteroid hit! Back to start.";

      updateScreen();
    }
  });

  const wall = document.getElementById("wall1");

if (wall && isTouching(rocket, wall)) {
  energy -= 10;

  rocketPosition = 20;
  rocketY = 120;

  document.getElementById("academy-message").innerHTML =
    "💥 You hit the wall! Back to start.";

  updateScreen();
  }

}

function nextMission() {
  document.getElementById("wall2").style.display = "block";
  currentMission = 2;
  energy = 40;
  rocketPosition = 20;
  rocketY = 120;
  currentQuestion = 0;
  gameComplete = false;

  document.querySelector("h2").innerHTML =
    "☄️ Mission 2: Navigate the Asteroid Belt";

  document.getElementById("station").innerHTML = "🏆";
  document.getElementById("next-mission").style.display = "none";
  document.getElementById("question-box").style.display = "none";

  document.querySelectorAll(".mission2-obstacle").forEach(function(obstacle) {
    obstacle.style.display = "block";
  });

document.querySelectorAll(".space-wall").forEach(function(wall) {
  wall.style.display = "block";
});

  asteroid1X = 250;
  document.getElementById("obstacle1").style.left = asteroid1X + "px";

  document.getElementById("academy-message").innerHTML =
    "Mission 2 started! Use all arrow keys to dodge asteroids.";

  updateScreen();
}

document.addEventListener("keydown", function(event) {
  if (gameComplete) {
    return;
  }

if (event.key === "q" || event.key === "Q") {
  loadQuestion();
  return;
}

  if (currentMission === 2) {
      if (energy <= 0) {
      energy = 0;
      updateScreen();
      loadQuestion();
      return;
  }
      if (event.key === "ArrowRight") {
      rocketPosition += 30;
      energy -= 10;
    }

    if (event.key === "ArrowLeft") {
      rocketPosition -= 30;
      energy -= 10;
    }

    if (event.key === "ArrowUp") {
      rocketY -= 30;
      energy -= 10;
    }

    if (event.key === "ArrowDown") {
      rocketY += 30;
      energy -= 10;
    }

    updateScreen();
    checkMission2Obstacles();

    if (isTouching(document.getElementById("academy-rocket"), document.getElementById("station"))) {
      gameComplete = true;
      document.getElementById("academy-message").innerHTML =
        "🏆 Mission 2 Complete! You survived the Asteroid Belt!";
    }

    if (energy <= 0 && !gameComplete) {
      energy = 0;
      updateScreen();
      loadQuestion();
    }

    return;
  }

  if (event.key === "ArrowRight") {
    if (energy <= 0) {
      energy = 0;
      updateScreen();
      loadQuestion();
      return;
    }

    energy -= 10;
    rocketPosition += 30;

    if (isTouching(document.getElementById("academy-rocket"), document.getElementById("station"))) {
      gameComplete = true;

      document.getElementById("academy-message").innerHTML =
        "🏆 Mission Complete! You reached the Space Station!";

      document.getElementById("next-mission").style.display = "block";
      document.getElementById("question-box").style.display = "none";
    }

    updateScreen();

    if (energy === 0 && !gameComplete) {
      loadQuestion();
    }
  }
});

document.getElementById("next-mission").addEventListener("click", nextMission);

updateScreen();

setInterval(function() {
  if (currentMission !== 2) {
    return;
  }

  asteroid1X += 3 * asteroidDirection;
  if (asteroid1X > 300 || asteroid1X < 150) {
    asteroidDirection *= -1;
  }
  document.getElementById("obstacle1").style.left = asteroid1X + "px";

  obstacle2Y += 2 * obstacle2Direction;
  if (obstacle2Y > 320 || obstacle2Y < 120) {
    obstacle2Direction *= -1;
  }
  document.getElementById("obstacle2").style.top = obstacle2Y + "px";

  obstacle3Y += 2 * obstacle3Direction;
  if (obstacle3Y > 260 || obstacle3Y < 60) {
    obstacle3Direction *= -1;
  }
  document.getElementById("obstacle3").style.top = obstacle3Y + "px";

  obstacle4X += 3 * obstacle4Direction;
  if (obstacle4X > 650 || obstacle4X < 470) {
    obstacle4Direction *= -1;
  }
  document.getElementById("obstacle4").style.left = obstacle4X + "px";

 obstacle5X += 4 * obstacle5Direction;

if (obstacle5X > 680 || obstacle5X < 560) {
  obstacle5Direction *= -1;
}

document.getElementById("obstacle5").style.left =
  obstacle5X + "px";

  checkMission2Obstacles();

}, 30);