let isMuted = false;
let currentLevel = 1;
let soundIcon;
let currentScreen = "menu";
let currentGameLevel = 0;
const levelColors = ["#2980b9", "#27ae60", "#e67e22", "#e74c3c", "#9b59b6"];
let sounds = {}


function preload() {
  soundIcon = loadImage('SoundIcon.png')
  sounds.menu = loadSound('StartScreen.wav');
  sounds.button = loadSound('StartButton.wav');
  sounds.level = loadSound('LevelSound.wav');
  sounds.next = loadSound('Next.wav');
}

function setup() {
  createCanvas(900, 600);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  if (currentScreen === "menu") {
    background(75);
    drawTitle();
    drawMainMenuButtons();
    drawBottomPanel();
    playLoop(sounds.menu);
    sounds.menu.rate(0.7)//menu sound
  } else {
    background(levelColors[currentGameLevel - 1]);
    playLoop(sounds.level); //level sound
  }
}
//title
function drawTitle() {
  fill(255);
  textSize(50)
  text("Find Different", width / 2, 100);
}

//start menu screen
function drawMainMenuButtons() {
  drawButton("Start", width / 2, 200);

  let showHint = false;
  drawButton("Game Rules", width / 2, 280);
  if (isMouseOver(width / 2, 280, 250, 40)) {
    fill(60);
    rect(width / 2 + 180, 280, 280, 160, 10);
    fill(255);
    textAlign(LEFT, TOP);
    textSize(18);
    text("1.\n2.\n3.\n4.\n5.", width / 2 + 50, 210); //game rules *******
    textAlign(CENTER, CENTER);
  }

}

function drawButton(label, x, y) {
  fill(100);
  rect(x, y, 250, 40, 10);
  fill(255);
  textSize(24);
  text(label, x, y);
}

function drawBottomPanel() {
  fill(60);
  rect(0, height - 50, width, 50);

  fill(255);
  textSize(20);
  text("Levels:", 50, height-50);
  for(let i = 1; i <= 5; i++) {
    let xPos = 100 + i*40;
    fill(i === currentLevel ? 255 : 150);
    rect(xPos, height-50, 30, 30, 5);
    fill(30);
    text(i, xPos, height-50);
  }

  drawVolumeIcon();
}


function drawVolumeIcon() {
  let iconSize = 30;
  let iconX = width - 50;
  let iconY = height - 25;

  if (soundIcon) {
    tint(255, isMuted ? 150 : 255);
    image(soundIcon, iconX, iconY, iconSize, iconSize);
    noTint();
  }

  if (isMuted) {
    stroke(255, 0, 0);
    line(iconX-15, iconY-15, iconX+15, iconY+15);
    noStroke();
  }
}

function mousePressed() {
  if (currentScreen === "menu") {
    if (isMouseOver(width/2, 200, 250, 40)) {
      playOnce(sounds.button); //button sound
      sounds.menu.stop();
      currentScreen = "game";
      currentGameLevel = 1;
    }
    checkLevelClick();
    checkVolumeClick();
  } else if (currentScreen === "game") {
    playOnce(sounds.next); //next level sound
    if (++currentGameLevel > 5) {
      sounds.level.stop();
      currentScreen = "menu";
      currentGameLevel = 0;
    }
  }
}

function isMouseOver(x, y, w, h) {
  return mouseX > x - w / 2 && mouseX < x + w / 2 &&
    mouseY > y - h / 2 && mouseY < y + h / 2;
}

function checkLevelClick() {
  for(let i = 1; i <= 5; i++) {
    let xPos = 100 + i*40;
    if(isMouseOver(xPos, height-30, 30, 30)) {
      currentLevel = i;
    }
  }
}

function playLoop(sound) {
  if (!isMuted && sound && !sound.isPlaying()) {
    sound.loop();
  }
}

function playOnce(sound) {
  if (!isMuted && sound) {
    sound.play();
  }
}

function checkVolumeClick() {
  if(isMouseOver(width-50, height-25, 30, 30)) {
    isMuted = !isMuted;
    Object.values(sounds).forEach(s => {
      if(s) s.setVolume(isMuted ? 0 : 1);
    });
  }
}