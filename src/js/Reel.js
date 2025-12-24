class Reel {
  constructor(reelContainer, idx, initialSymbols) {
    this.reelContainer = reelContainer;
    this.idx = idx;

    this.symbolContainer = document.createElement("div");
    this.symbolContainer.classList.add("icons");
    this.reelContainer.appendChild(this.symbolContainer);

    initialSymbols.forEach((symbol) =>
      this.symbolContainer.appendChild(new SymbolClass(symbol).img)
    );
  }

  renderSymbols(nextSymbols) {
    this.symbolContainer.innerHTML = "";
    nextSymbols.forEach((s) => this.symbolContainer.appendChild(new SymbolClass(s).img));
  }

  spin() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000 + this.idx * 300);
    });
  }
}
