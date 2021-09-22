const COLOR_CODES = {
  wall: [0, 0, 0, 255],
  spawn: [200, 0, 0],
  type1: [150, 150, 50],
  type2: [0, 100, 200],
  type3: [50, 150, 0]
}

// Set dom

setTimeout(() => {
  let values = Object.values(COLOR_CODES);
  let keys = Object.keys(COLOR_CODES);
  for (let i = 0; i < values.length; i++) {
    let elem = document.getElementById(keys[i] + 'button');
    elem.style = 'background-color: rgb(' + values[i].join() + ')';
  }
}, 1);