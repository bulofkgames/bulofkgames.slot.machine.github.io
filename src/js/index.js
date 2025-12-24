import Slot from './Slot.js';

const config = {
  inverted: false,
  onSpinStart: symbols => console.log("Spin started:", symbols),
  onSpinEnd: symbols => console.log("Spin ended:", symbols)
};

const slot = new Slot(document.getElementById("slot"), config);
