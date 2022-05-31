class SwipeCarousel extends Carousel {
  _initListeners() {
    super._initListeners();
    this.container.addEventListener("touchstart", this.swipeStart.bind(this));
    this.container.addEventListener("touchend", this.swipeEnd.bind(this));
  }
  swipeStart(e) {
    this.touchStart = e.changedTouches[0].pageX;
  }
  swipeEnd(e) {
    this.touchEnd = e.changedTouches[0].pageX;
    if (this.touchStart - this.touchEnd > 100) {
      this.pause();
      this.toRight();
    }
    if (this.touchStart - this.touchEnd < -100) {
      this.pause();
      this.toLeft();
    }
  }
}
