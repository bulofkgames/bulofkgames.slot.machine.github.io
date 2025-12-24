const slot = new Slot(document.getElementById("slot"), {
  onSpinStart: (symbols) => console.log("Spin started:", symbols),
  onSpinEnd: (symbols) => console.log("Spin ended:", symbols),
});
