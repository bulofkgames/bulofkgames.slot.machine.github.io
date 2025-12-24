import Symbol from "./Symbol.js";

export default class Reel {
  constructor(reelContainer, idx, initialSymbols) {
    this.reelContainer = reelContainer;
    this.idx = idx;

    this.symbolContainer = document.createElement("div");
    this.symbolContainer.classList.add("icons");
    this.reelContainer.appendChild(this.symbolContainer);

    initialSymbols.forEach(symbol =>
      this.symbolContainer.appendChild(new Symbol(symbol).img)
    );
  }

  renderSymbols(nextSymbols) {
    this.symbolContainer.innerHTML = "";
    nextSymbols.forEach(symbol => {
      this.symbolContainer.appendChild(new Symbol(symbol).img);
    });
  }

  spin() {
    return new Promise(resolve => {
      // Simula animação
      setTimeout(() => resolve(), 1000 + this.idx * 300);
    });
  }
}
