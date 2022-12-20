const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// variables
let startBtn = document.querySelector("#start-button");
let restartBtn = document.querySelector("#restart-button");
let muteBtn = document.querySelector("#mute-button");
let smileyLogo = document.querySelector("#excited-img");
let mixedLogo = document.querySelector("#mixed-img");
let arrows = document.querySelector("#arrows-img");

let dizzyLogo = document.querySelector("#dizzy-img");
let blurb = document.querySelector("#intro-blurb");
let gameIntroDiv = document.querySelector(".game-intro");
let gameBoardDiv = document.querySelector("#game-board");
let gameOverDiv = document.querySelector(".game-over");
let finalScoreEnd = document.querySelector("#final-score");


// music & sound effects
let gameMusic = new Audio("audio/game-music.mp3");
gameMusic.volume = 0.5; 

let endMusic = new Audio("audio/game-end-sound.mp3");
endMusic.volume = 0.5; 

let rewardMusic = new Audio("audio/ding-sound-effect.mp3");
rewardMusic.volume = 0.5; 



//field image
const imgField = new Image();
imgField.src = 'images/field-background.jpg';


// falling rocks images
const imgRock1 = new Image();
imgRock1.src = 'images/Kuva1.png';
const imgRock2 = new Image();
imgRock2.src = 'images/Kuva2.png';
const imgRock3 = new Image();
imgRock3.src = 'images/Kuva3.png';
const imgRock4 = new Image();
imgRock4.src = 'images/Kuva4.png';


// falling smileys images
const imgSmiley1 = new Image();
imgSmiley1.src = 'images/money-emoji.png';
const imgSmiley2 = new Image();
imgSmiley2.src = 'images/laugh.png';
const imgSmiley3 = new Image();
imgSmiley3.src = 'images/love.png';
const imgSmiley4 = new Image();
imgSmiley4.src = 'images/smiley.png';
const imgSmiley5 = new Image();
imgSmiley5.src = 'images/monocle.png';
const imgSmiley6 = new Image();
imgSmiley6.src = 'images/tongue.png';
const imgSmiley7 = new Image();
imgSmiley7.src = 'images/upside-down.png';
const imgSmiley8 = new Image();
imgSmiley8.src = 'images/smirk.png';


//player smiley image
const imgPlayer = new Image();
imgPlayer.src = 'images/smiling.png';

// player variables
const playerWidth = 100;
const playerHeight = 100;
const playerSpeedValue = 5;
let playerX = canvas.width / 2 - playerWidth / 2;
let playerY = canvas.height - playerHeight - 25;
let isPlayerGoingLeft = false;
let isPlayerGoingRight = false;

let score = 0;
let gameOver = false;
let animationFrameId = 0;


// rock variables
const rockWidth = 80;
const rockHeight = 80;
let rockSpeedValue = 3;
let rockX = canvas.width / 2 - rockWidth / 2;
let rockY = canvas.height - rockHeight;


//draw field background 
function drawField() {
ctx.drawImage(imgField, 0, 0, canvas.width, canvas.height);
}

//draw player emoji
function drawPlayer() {
  ctx.drawImage(imgPlayer, playerX, playerY, playerWidth, playerHeight);
}


//generate random 'X' positions for falling rocks
let randomXPlacement = () => {
  let biggestX = canvas.width - 20;
  let smallestX = 20;
  let randomX = Math.floor(
    Math.random() * (biggestX - smallestX + 1) + smallestX
  );
  console.log(randomX);
  return randomX;
};



//rocks group information
rockArray = [
  { img: imgRock1, x: randomXPlacement(), y: -200, width: 110, height: 110 },
  { img: imgRock2, x: randomXPlacement() - 300, y: -800, width: 80, height: 80 },
  { img: imgRock3, x: randomXPlacement(), y: -1600, width: 100, height: 100 },
  { img: imgRock4, x: randomXPlacement(), y: -2300, width: 110, height: 110 },
  { img: imgRock1, x: randomXPlacement(), y: -3000, width: 90, height: 90 },
  { img: imgRock2, x: randomXPlacement() - 200, y: -3700, width: 110, height: 110 },
  { img: imgRock3, x: randomXPlacement(), y: -4300, width: 120, height: 120 },
  { img: imgRock4, x: randomXPlacement(), y: -5000, width: 100, height: 100 },
  { img: imgRock1, x: randomXPlacement(), y: -400, width: 80, height: 80 },
  { img: imgRock2, x: randomXPlacement() - 500, y: -600, width: 90, height: 90 },
  { img: imgRock3, x: randomXPlacement(), y: -1000, width: 100, height: 100 },
  { img: imgRock4, x: randomXPlacement(), y: -2000, width: 80, height: 80 },
  { img: imgRock1, x: randomXPlacement(), y: -3500, width: 90, height: 90 },
  { img: imgRock2, x: randomXPlacement() - 400, y: -3000, width: 110, height: 110 },
  { img: imgRock3, x: randomXPlacement(), y: -4000, width: 120, height: 120 },
  { img: imgRock4, x: randomXPlacement(), y: -5200, width: 100, height: 100 },
];


//smileys group information
smileysArray = [
  { img: imgSmiley1, x: randomXPlacement(), y: -200, width: 100, height: 100 },
  { img: imgSmiley2, x: randomXPlacement() - 300, y: -800, width: 80, height: 80 },
  { img: imgSmiley3, x: randomXPlacement(), y: -1600, width: 100, height: 100 },
  { img: imgSmiley4, x: randomXPlacement(), y: -2300, width: 80, height: 80 },
  { img: imgSmiley5, x: randomXPlacement(), y: -3000, width: 90, height: 90 },
  { img: imgSmiley6, x: randomXPlacement() - 200, y: -3700, width: 100, height: 100 },
  { img: imgSmiley7, x: randomXPlacement(), y: -4300, width: 110, height: 110 },
  { img: imgSmiley8, x: randomXPlacement(), y: -5000, width: 90, height: 90 },
];



//When "Start Game" is clicked: 

function startGame() {

  canvas.style.display = 'block'
  gameBoardDiv.style.display = 'block'
  startBtn.style.display = "none";
  arrows.style.display = "none";
  smileyLogo.style.display = "none";
  mixedLogo.style.display = "none";
  blurb.style.display = "none";
  gameIntroDiv.style.display = "none";
  gameOverDiv.style.display = "none";

  drawField()
  drawPlayer()

  // rocks speed increases as game progresses:
  if (score > 20) {rockSpeedValue = 4}
  if (score > 30) {rockSpeedValue = 4.2}
  if (score > 40) {rockSpeedValue = 4.4}
  if (score > 70) {rockSpeedValue = 4.6}
  if (score > 90) {rockSpeedValue = 4.8}
  if (score > 100) {rockSpeedValue = 5.0}
  if (score > 130) {rockSpeedValue = 5.2}

  if (score > 150) {rockSpeedValue = 5.4}
  if (score > 200) {rockSpeedValue = 5.6}
  if (score > 250) {rockSpeedValue = 5.8}
  if (score > 280) {rockSpeedValue = 6}
  if (score > 300) {rockSpeedValue = 7}
  if (score > 350) {rockSpeedValue = 8}
  if (score > 400) {rockSpeedValue = 9}


// for-loop for the falling rocks
  for (let i = 0; i < rockArray.length; i++) {
    ctx.drawImage(
      rockArray[i].img,
      rockArray[i].x,
      rockArray[i].y,
      rockArray[i].width,
      rockArray[i].height
    );
    rockArray[i].y += rockSpeedValue;

    //ctx.drawImage(rock, middle + 50, height, 80, 150);
    if (rockArray[i].y > canvas.height) {
      rockArray[i].y = -5500;
    }

    //score (inside of for loop), if rock passes player, score ++
    if (
      rockArray[i].y > playerY + playerHeight &&
      rockArray[i].y <= playerY + playerHeight + rockSpeedValue
    ) {
      score = score + 1;
    }

    //collision inside of for loop
    if (
      // checks if the bottom of the rock is touching the top of the player
      rockArray[i].y + rockArray[i].height >= playerY + 10 &&
      //checks if the right side of the player is more to the right than the rock
      playerX + 120 > rockArray[i].x &&
      // checks if the left side of the player is touching the left side of the rock
      playerX < rockArray[i].x + rockArray[i].width &&
      //checks if the bottom of the player is touching the top of the rock
      playerY + playerHeight - 10 > rockArray[i].y
    ) {
      gameOver = true;
      finalScoreEnd.innerHTML = score
    }
  }



  // for-loop for the falling smileys
  for (let i = 0; i < smileysArray.length; i++) {
    ctx.drawImage(
      smileysArray[i].img,
      smileysArray[i].x,
      smileysArray[i].y,
      smileysArray[i].width,
      smileysArray[i].height
    );
    smileysArray[i].y += rockSpeedValue;

    //ctx.drawImage(smiley, middle + 50, height, 80, 150);
    if (smileysArray[i].y > canvas.height) {
      smileysArray[i].y = -5500;
    }

    //collision inside of for loop, if smiley hits player, score ++
    if (
      // checks if the bottom of smiley  is touching the top of  player
      smileysArray[i].y + smileysArray[i].height >= playerY + 10 &&
      //checks if the right side of the player is more to the right than the smiley
      playerX + 120 > smileysArray[i].x &&
      // checks if the left side of the player is touching the left side of the smiley
      playerX < smileysArray[i].x + smileysArray[i].width &&
      //checks if the bottom of the player is touching the top of the smiley
      playerY + playerHeight - 10 > smileysArray[i].y
    ) {
      smileysArray[i].x = randomXPlacement()
      smileysArray[i].y = -600;
      score = score + 2;
      rewardMusic.play()
    }
  }


  // Scoreboard
  ctx.font = "40px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText(
    `Score: ${score}`,
    50,
    50
  );


  //move the player left and right

  if (isPlayerGoingLeft) {
    if (playerX > 0) {
      playerX -= playerSpeedValue;
    }
  } 
  else if (isPlayerGoingRight) {
    if (playerX < canvas.width - playerWidth) {
      playerX += playerSpeedValue;
    }
}



if (gameOver) {
  drawEnding()
  endMusic.play()
  gameMusic.pause()
  cancelAnimationFrame(animationFrameId);
} else {
  animationFrameId = requestAnimationFrame(startGame);
}
}




function drawEnding() {
    restartBtn.style.display = "block";
    dizzyLogo.style.display = "block";
    gameOverDiv.style.display = "flex"
    gameBoardDiv.style.display = 'none'
    canvas.style.display = 'none'
    }


// Event listeners and window.onload

  document.addEventListener("keydown", event => {
    if (event.code === "ArrowLeft") {
        isPlayerGoingLeft = true;
    }
    if (event.code === "ArrowRight") {
        isPlayerGoingRight = true;
    }
  });

  
  document.addEventListener("keyup", event => {
    isPlayerGoingLeft = false;
    isPlayerGoingRight = false;
  });

  
  window.addEventListener("load", () => {

    canvas.style.display = 'none'
    restartBtn.style.display = "none";
    dizzyLogo.style.display = "none";
    arrows.style.display = "block";
    gameOverDiv.style.display = "none"
    gameBoardDiv.style.display = 'none'
  
  

  document.getElementById('start-button').onclick = () => {
    console.log("start clicked");
    startGame();
    gameMusic.play()
    
  }

  restartBtn.addEventListener("click", () => {
    window.location.reload();
    
  }
  )

  muteBtn.addEventListener("click", () => {
    if (muteBtn.innerHTML === "Mute") {
    gameMusic.pause();
    muteBtn.innerHTML = "Unmute"
    }
    else {
      gameMusic.play();
      muteBtn.innerHTML = "Mute"
    }
  }
  )

});