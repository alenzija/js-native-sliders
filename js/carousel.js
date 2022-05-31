class Carousel {
  constructor(p) {
    const settings = {
      ...{ containerID: ".container", slideID: ".slide", INTERVAL: 2000 },
      ...p,
    };
    this.container = document.querySelector(settings.containerID);
    this.slides = document.querySelectorAll(settings.slideID);
    this.INTERVAL = settings.INTERVAL;
  }

  _initProps() {
    this.SLIDES_LENGHT = this.slides.length;
    this.CODE_RIGHT = "ArrowRight";
    this.CODE_lEFT = "ArrowLeft";
    this.CODE_SPACE = "Space";
    this.FA_PLAY = '<i class="fa fa-play-circle" aria-hidden="true"></i>';
    this.FA_PAUSE = '<i class="fa fa-pause-circle" aria-hidden="true"></i>';
    this.FA_LEFT =
      '<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>';
    this.FA_RIGHT =
      '<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>';
    this.CIRCLE_O = `<i class="fa-solid fa-circle"></i>`;
    this.CIRCLE = `<i class="fa-regular fa-circle"></i>`;

    this.slideInterval = null;
    this.touchStart = null;
    this.touchEnd = null;
    this.currentSlide = 0;
    this.isPlaying = true;
  }

  _initControls() {
    const PAUSE = `<span class="controls" id="pause">${this.FA_PAUSE}</span>`;
    const LEFT = `<span class="controls" id="left">${this.FA_LEFT}</span>`;
    const RIGHT = `<span class="controls" id="right">${this.FA_RIGHT}</span>`;
    const controls = document.createElement("div");
    controls.setAttribute("class", "container-controls");
    this.container.appendChild(controls);
    controls.innerHTML = LEFT + PAUSE + RIGHT;
    this.pauseBtn = document.querySelector("#pause");
    this.right = document.querySelector("#right");
    this.left = document.querySelector("#left");
  }

  _initIndicators() {
    const indicators = document.createElement("div");
    indicators.setAttribute("class", "container-indicators");
    for (let i = 0; i < this.SLIDES_LENGHT; i++) {
      let indicator = document.createElement("div");
      indicator.setAttribute("class", "indicator");
      i === 0
        ? (indicator.innerHTML = this.CIRCLE_O)
        : (indicator.innerHTML = this.CIRCLE);
      indicator.querySelector("i").dataset.slideTo = `${i}`;
      indicators.appendChild(indicator);
    }
    this.container.appendChild(indicators);
    this.indicatorsContainer = document.querySelector(".container-indicators");
    this.indicators = document.querySelectorAll(".indicator");
  }

  _initListeners() {
    this.indicatorsContainer.addEventListener(
      "click",
      this.indicate.bind(this)
    );

    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.right.addEventListener("click", this.toRight.bind(this));
    this.left.addEventListener("click", this.toLeft.bind(this));
    document.addEventListener("keydown", this.keypress.bind(this));
  }

  goTo(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide]
      .querySelector(".fa-circle")
      .classList.toggle("fa-regular");
    this.indicators[this.currentSlide]
      .querySelector(".fa-circle")
      .classList.toggle("fa-solid");

    this.currentSlide = (n + this.SLIDES_LENGHT) % this.SLIDES_LENGHT;

    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide]
      .querySelector(".fa-circle")
      .classList.toggle("fa-regular");
    this.indicators[this.currentSlide]
      .querySelector(".fa-circle")
      .classList.toggle("fa-solid");
  }

  next() {
    this.goTo(this.currentSlide + 1);
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    clearInterval(this.slideInterval);
  }

  play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this.slideInterval = setInterval(this.next.bind(this), this.INTERVAL);
  }

  toRight() {
    this.pause();
    this.next();
  }

  toLeft() {
    this.pause();
    this.goTo(this.currentSlide - 1);
  }

  indicate(e) {
    let target = e.target;
    if (target && target.classList.contains("fa-circle")) {
      this.pause();
      this.goTo(+target.dataset.slideTo);
    }
  }

  keypress(e) {
    e.code === this.CODE_RIGHT && this.toRight();
    e.code === this.CODE_lEFT && this.toLeft();
    e.code === this.CODE_SPACE && this.pausePlay();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this.slideInterval = setInterval(() => this.next(), this.INTERVAL);
  }
}
