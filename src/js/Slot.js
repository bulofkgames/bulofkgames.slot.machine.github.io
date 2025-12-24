import Reel from "./Reel.js";
import Symbol from "./Symbol.js";

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.container = domElement;
    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, [Symbol.random(), Symbol.random(), Symbol.random()])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");
    this.config = config;
  }

  spin() {
    this.spinButton.disabled = true;

    const nextSymbols = this.reels.map(() => [Symbol.random(), Symbol.random(), Symbol.random()]);
    const promises = this.reels.map((reel, idx) => {
      reel.renderSymbols(nextSymbols[idx]);
      return reel.spin();
    });

    return Promise.all(promises).then(() => {
      this.spinButton.disabled = false;
      if (this.autoPlayCheckbox.checked) setTimeout(() => this.spin(), 500);
    });
  }
}
