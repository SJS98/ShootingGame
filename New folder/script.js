
// Checking Level



// 

let gunAim = document.getElementById('gun_aim');
let flyingBird = document.getElementById('flyingBird');
let mainFrame = document.getElementById('mainFrame');
gunAim.style.cursor = "none";

document.addEventListener('mousemove', function () {

  let mousePosition = window.event;
  let mPX = mousePosition.clientX;
  let mPY = mousePosition.clientY;

  if (mPY >= 50) {
    gunAim.style.left = mPX - 40 + "px";
    gunAim.style.top = mPY - 40 + "px";
  }
});

gunAim.addEventListener('mousedown', function () {
  // To zoom aim
  gunAim.style.transform = "scale(1.5)";
  // To resize aim
  setInterval(function () {
    gunAim.style.transform = "scale(1)";
  }, 100);
});

gunAim.addEventListener('click', function() {
  let mousePosition = window.event;
  let mPX = mousePosition.clientX;
  let mPY = mousePosition.clientY;

  let fireSound = new Audio('./Audios/Events/Fires/mixkit-game-gun-shot-1662.mp3');
  fireSound.play();

  isBirdKilled(mPX, mPY);

  document.getElementById('mainFrame').innerHTML +=
    `<span id="fire" style="left:${mPX - 26}px;top:${mPY - 27}px"></span>`;
});

function isBirdKilled(bulletX, bulletY) {
  let minX = bulletX - 40;
  let maxX = bulletX + 40;

  let minY = bulletY - 40;
  let maxY = bulletY + 40;

  // alert('('+minX+','+randomX+','+maxX+')'+' '+'('+minY+','+randomY+','+maxY+')')

  // Get the bounding rectangles of the divs
  const aim = gunAim.getBoundingClientRect();
  const bird = flyingBird.getBoundingClientRect();

  // Check if the gunAim & bird is overlap
  const overlap = !(aim.right < bird.left ||
    aim.left > bird.right ||
    aim.bottom < bird.top ||
    aim.top > bird.bottom);

  if(overlap){
    let birdImg = document.getElementById('birdImg');
    birdImg.src = "./Images/animated_gifs/killed_blood.gif";
    
    clearInterval(moveBirdId);
    setTimeout(killTheBird, 1500);

    let birdKilledSound = new Audio('./Audios/Events/Fires/mixkit-little-bird-creak-in-the-swamp-25.wav');
    birdKilledSound.play();
    let bloodSound = new Audio('./Audios/Events/Fires/mixkit-little-bird-creak-in-the-swamp-25.wav');
    birdKilledSound.play();
  }
}

function killTheBird() {
  let bird = document.getElementById('birdImg');
  bird.style.transitionDuration = "1s";
  bird.style.display = "none";
  setTimeout(createBirdAfterKill, 3000);
  moveBirdId = setInterval(moveBird, 3000);
}

function createBirdAfterKill() {
  let bird = document.getElementById('birdImg');
  bird.style.transitionDuration = "1s";
  bird.src = "./Images/animated_gifs/flying_bird.gif";
  bird.style.display = "block";
}

let randomX = 0;
let randomY = 0;

const bird = document.getElementById('flyingBird');

function moveBird() {
  let randomLeftPoint = Math.floor(Math.random() * window.innerWidth);
  let randomTopPoint = Math.floor(Math.random() * window.innerHeight);

  let birdImg = document.getElementById('birdImg');

  if (randomLeftPoint < randomX) {
    birdImg.src = "./Images/animated_gifs/flying_bird_towards_left.gif";
  } else {
    birdImg.src = "./Images/animated_gifs/flying_bird.gif";
  }

  randomX = randomLeftPoint;
  randomY = randomTopPoint;

  bird.style.transition = "1.2s linear";
  bird.style.left = randomLeftPoint + "px";
  bird.style.top = randomTopPoint + "px";

}

const moveBirdId = setInterval(moveBird, 3000);

/*************************/
// Script for mobile

// let jHandle = document.getElementById('jHandle');

// jHandle.addEventListener('mousemove',function(){

// })