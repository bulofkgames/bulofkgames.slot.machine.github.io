import Symbol from './Symbol.js';

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
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < nextSymbols.length; i++) {
      const icon = new Symbol(nextSymbols[i]);
      fragment.appendChild(icon.img);
    }

    this.symbolContainer.appendChild(fragment);
  }

  spin() {
    return new Promise(resolve => {
      this.symbolContainer.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-200%)" }
        ],
        {
          duration: 1000 + this.idx * 200,
          easing: "ease-in-out"
        }
      ).onfinish = resolve;
    });
  }
}
