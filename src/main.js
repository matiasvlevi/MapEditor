let wnx = 800;
let wny = 600;

let grid;

function setup() {
  let canvas = createCanvas(wnx, wny);
  canvas.parent('editor');
  frameRate(60);
  grid = new Grid(0, 0, 25, 25, 32, 24);
}
let tick = 0;

function draw() {
  background(200);
  grid.render(tick);
  tick++;
}