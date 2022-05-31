const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const container = document.querySelector(".container-slides");

const INTERVAL = 2000;
const SLIDES_LENGHT = slides.length;
const CODE_RIGHT = "ArrowRight";
const CODE_lEFT = "ArrowLeft";
const CODE_SPACE = "Space";
const FA_PLAY = '<i class="fa fa-play-circle" aria-hidden="true"></i>';
const FA_STOP = '<i class="fa fa-stop-circle" aria-hidden="true"></i>';

let slideInterval = null;
let touchStart = null;
let touchEnd = null;
let currentSlide = 0;
let isPlaying = true;
let pauseBtn = document.querySelector("#pause");
let right = document.querySelector("#right");
let left = document.querySelector("#left");

let indicatorsContainer = document.querySelector("#container-indicators");

function next() {
  goTo(currentSlide + 1);
}

function goTo(n) {
  slides[currentSlide].classList.toggle("active");
  indicators[currentSlide].classList.toggle("active");
  currentSlide = (n + SLIDES_LENGHT) % SLIDES_LENGHT;
  slides[currentSlide].classList.toggle("active");
  indicators[currentSlide].classList.toggle("active");
}

const pausePlay = () => (isPlaying ? pause() : play());

function pause() {
  pauseBtn.innerHTML = FA_PLAY;
  isPlaying = false;
  clearInterval(slideInterval);
}

function play() {
  pauseBtn.innerHTML = FA_STOP;
  isPlaying = true;
  slideInterval = setInterval(next, INTERVAL);
}

function toRight() {
  pause();
  next();
}

function toLeft() {
  pause();
  goTo(currentSlide - 1);
}

function indicate(e) {
  target = e.target;
  if (target && target.classList.contains("indicator")) {
    pause();
    goTo(+target.dataset.slideTo);
  }
}

function keypress(e) {
  e.code === CODE_RIGHT && toRight();
  e.code === CODE_lEFT && toLeft();
  e.code === CODE_SPACE && pausePlay();
}

function swipeStart(e) {
  touchStart = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
  touchEnd = e.changedTouches[0].pageX;
  if (touchStart - touchEnd > 100) {
    pause();
    toRight();
  }
  if (touchStart - touchEnd < -100) {
    pause();
    toLeft();
  }
}

indicatorsContainer.addEventListener("click", indicate);
pauseBtn.addEventListener("click", pausePlay);
right.addEventListener("click", toRight);
left.addEventListener("click", toLeft);
document.addEventListener("keydown", keypress);
container.addEventListener("touchstart", swipeStart);
container.addEventListener("touchend", swipeEnd);

slideInterval = setInterval(next, INTERVAL);
