import Reel from './Reel.js';
import Symbol from './Symbol.js';

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.container = domElement;

    this.currentSymbols = Array(5).fill(null).map(() => Array(3).fill("death_star"));
    this.nextSymbols = Array(5).fill(null).map(() => Array(3).fill("death_star"));

    this.reels = Array.from(this.container.getElementsByClassName("reel"))
      .map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");

    this.config = config;
  }

  spin() {
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = Array(5).fill(null).map(() => Array(3).fill().map(() => Symbol.random()));

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel, idx) => {
        reel.renderSymbols(this.nextSymbols[idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;
    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols) {
    this.spinButton.disabled = false;
    this.config.onSpinEnd?.(symbols);

    if (this.autoPlayCheckbox.checked) {
      setTimeout(() => this.spin(), 200);
    }
  }
}
