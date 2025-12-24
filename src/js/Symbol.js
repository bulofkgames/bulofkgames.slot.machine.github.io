const cache = {};

class SymbolClass {
  constructor(name = SymbolClass.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = `assets/symbols/${name}.svg`; // caminho correto

      cache[name] = this.img;
    }
  }

  static preload() {
    SymbolClass.symbols.forEach((symbol) => new SymbolClass(symbol));
  }

  static get symbols() {
    return [
      "at_at",
      "c3po",
      "darth_vader",
      "death_star",
      "falcon",
      "r2d2",
      "stormtrooper",
      "tie_ln",
      "yoda",
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
