let boxes =4;
const randomLimit = boxes + boxes;
let level = 1;
let score = 0;
let arr = [];
const containerElem = document.getElementById("global");
const introMusic = new Audio("./intromsc.mp3");
const boxclickSound = new Audio("boxclick.mp3");
const confettiSound = new Audio("confetti.mp3");
const wrongAnssound = new Audio("wrongAns.mp3");
const buttonwrapper = document.getElementById("bodycontainer");
const InstConatianer = document.getElementById("Inst-Conatianer"); 

function launchGame() {
  instructions();
  document.getElementById("scoreWrapper").style.display = "none";
  document.getElementById("submitbtn").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("playerName").style.display = "none";
  document.getElementById("hello").innerHTML =
    "Hello " + document.getElementById("inputName").value + " !!";
  const status = document.getElementById("mute");
  if (status.checked == true) {
    introMusic.pause();
    document.getElementById("gameContainer").classList.remove("lineUp");
  } else {
    introMusic.play();
  }
  if (boxes > 15) {
    document.getElementById("global").style.width = "100%";
    document.getElementById("scoreWrapper").style.margin = "0rem auto";
    document.getElementById("global").style.margin = "0px auto";
    document.getElementById("score").style.padding = "7px";
    document.getElementById("level").style.padding = "7px";
  } else {
    document.getElementById("global").style.width = "95%";
  }
}


const instructions = () => {
 const instructions =
  ["The objective of Eyelander is to work on your field of vision by accurately identifying the order of the numbers flashed.", 
  "A number of boxes with numbers inside will pop up shortly after the you click the start button.",
  "The goal is to remember all of the numbers that appear on the screen and select them in ascending numerical order.Boxes will increase with level." 
,"These numbers will disappear after a second, so you have to be vigilant! You're then left with blank squares.",
"The goal is to remember what order the numbers appeared on the screen and select them in ascending order (from lowest to highest.) Score increments equals to number of boxes."]

const heading = document.createElement("h2");
heading.innerHTML = "Instructions";
heading.classList.add("InstHeading");
InstConatianer.appendChild(heading);

  const ul = document.createElement("ul");
  document.body.appendChild(ul);
 
  for (let i =0; i < 5; i++)
  {
      const li = document.createElement("li");  
      li.innerHTML = instructions[i];
      ul.appendChild(li);
  }
  InstConatianer.appendChild(ul);
 
};

























// funtions to genrate boxes-----------------------------------------
function generateBoxes() {
  document.getElementById("buttonwrapper").style.display = "flex";
  document.getElementById("scoreWrapper").style.display = "flex";
  removeAllChildNodes(containerElem);
  hideDiv();
  introMusic.pause();
  document.getElementById("hello").innerHTML = "";
  const start = document.getElementById("startbtn").innerHTML;
  for (let i = 0; i < boxes; i++) {
    const boxElem = document.createElement("button");
    if (boxes > 15) {
      boxElem.classList.add("box2");
    } else {
      boxElem.classList.add("box");
    }

setTimeout(() => {
  boxElem.addEventListener("click", handleClick);
}, 2000);

    containerElem.appendChild(boxElem);
  }
  if (start.trim() === "START") {
    document.getElementById("submitbtn").style.display = "block";
    document.getElementById("startbtn").innerHTML = "NEXT LEVEL";
    document.getElementById("score").innerHTML =  score;
    document.getElementById("level").innerHTML =  level;
  }
  generateRandomNumbers(boxes);

    if (start==="RETRY" || start === "NEXT LEVEL") {
    document.getElementById("level").innerHTML = level++;
    document.getElementById("startbtn").disabled = true;
    document.getElementById("message").classList.remove("message")
  }

  if(boxes>=12){
    gameOver();
  }
}













function confettiblast() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Funtion to genrate numbers-----------------------------------------------------------
function generateRandomNumbers(count) {
  arr = [];
  const uniqueNumber = new Set();
  while (uniqueNumber.size < count) {
    const number = Math.round(Math.random() * randomLimit);
    uniqueNumber.add(number);
  }
  const arr1 = [...uniqueNumber];

  if (boxes > 15) {
    for (let i = 0; i < boxes; i++) {
      const boxText = document.getElementsByClassName("box2");
      boxText[i].innerHTML = arr1[i];
      boxText[i].setAttribute("id", arr1[i]);
      boxText[i].disabled = false;
      boxText[i].style.opacity = 1;
      timer();
    }
  } else {
    for (let i = 0; i < boxes; i++) {
      const boxText2 = document.getElementsByClassName("box");
      boxText2[i].innerHTML = arr1[i];
      boxText2[i].setAttribute("id", arr1[i]);
      boxText2[i].disabled = false;
      boxText2[i].style.opacity = 1;
      timer();
    }
  }
}

function timer() {
  setTimeout(function generateRandomNumbers() {
    const lessBoxes = document.getElementsByClassName("box");
    const moreboxes = document.getElementsByClassName("box2");

    if (boxes > 15) {
      for (i = 0; i < boxes; i++) {
        moreboxes[i].innerHTML = "";
      }
    } else {
      for (i = 0; i < boxes; i++) {
        lessBoxes[i].innerHTML = "";
      }
    }
  }, 2000);
}

function submit() {
 
  const sortedArray = arr.slice().sort((a, b) => parseInt(a) - parseInt(b));
  if (sortedArray.length === boxes) {
    const check = JSON.stringify(arr) == JSON.stringify(sortedArray);
    if (check) {
      confettiSound.play();
      confettiblast();
      document.getElementById("message").innerHTML = "Correct Answer";
      document.getElementById("message").classList.add("message")
      document.getElementById("message").style.color = "green";
      document.getElementById("startbtn").innerHTML = "NEXT LEVEL";
      score += boxes;
      boxes++;
      document.getElementById("score").innerHTML =  score;
      document.getElementById("level").innerHTML =  level;
      document.getElementById("startbtn").disabled = false;
    } else {
      wrongAnssound.play();
      document.getElementById("message").innerHTML = "Wrong Answer";
      document.getElementById("message").classList.add("message")
      document.getElementById("message").style.color = "red";
      document.getElementById("startbtn").innerHTML = "RETRY";
      document.getElementById("startbtn").disabled = false;
      // setTimeout(() => {
      //   document.getElementById("message").classList.remove("message")
      // }, 50000);
      
    }
  }
}
function hideDiv() {
  document.getElementById("message").innerHTML = "";
}

function handleClick(event) {
  event.target.innerHTML = event.target.id;
  arr.push(event.target.id);
  event.target.disabled = true;
  event.target.style.opacity = 0.5;
  boxclickSound.play();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function showDiv() {
 
  document.getElementById("Inst-Conatianer").style.display = "none";
}

function gameOver() {
  document.getElementById("global").style.display = "none";
  document.getElementById("message").innerHTML =
    "Game Over" +
    "<br>" +
    "Congratulations " +
    document.getElementById("inputName").value +
    "!!!" +
    "<br>" +
    "Your score is: " +
    score +
    "<br>";
  document.getElementById("scoreWrapper").style.display = "none";
  document.getElementById("level").style.display = "none";
  document.getElementById("startbtn").style.display = "none";
  document.getElementById("submitbtn").style.display = "none";
  makebtn();
}

function makebtn() {
  const restartBtn = document.createElement("button");
  restartBtn.innerHTML = "RESTART";
  restartBtn.classList.add("start-btn");
  restartBtn.setAttribute("id", "restart");
  restartBtn.addEventListener("click", restart);
  buttonwrapper.appendChild(restartBtn);
  document.getElementById("restart").style.marginTop = "50px";
}

function restart() {
  window.location.reload();
}
