class Slot {
  constructor(domElement, config = {}) {
    SymbolClass.preload();

    this.currentSymbols = [
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"]
    ];

    this.nextSymbols = [
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"],
      ["death_star","death_star","death_star"]
    ];

    this.container = domElement;
    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");
    this.config = config;
  }

  spin() {
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = Array.from({ length: 5 }, () =>
      Array.from({ length: 3 }, () => SymbolClass.random())
    );

    this.onSpinStart(this.nextSymbols);

    Promise.all(
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
      setTimeout(() => this.spin(), 500);
    }
  }
}
