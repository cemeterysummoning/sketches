colors_list = [
  {color1R: 0, 
      color1G: 0, 
      color1B: 0,
      color2R: 255,
      color2G: 255, 
      color2B: 255},
  {color1R: 251, 
      color1G: 234, 
      color1B: 235, 
      color2R: 47, 
      color2G: 60, 
      color2B: 126}, 
  {color1R: 16, 
      color1G: 24, 
      color1B: 32, 
      color2R: 254, 
      color2G: 231, 
      color2B: 21}, 
  {color1R: 173, 
      color1G: 216, 
      color1B: 230, 
      color2R: 0, 
      color2G: 0, 
      color2B: 139}
]

let x = 0, y = 0;
let colors;

function setup() {
  createCanvas(window.innerWidth / 2, window.innerHeight);
  frameRate(10);
  colors = random(colors_list);
  document.body.style.background = `rgb(${colors.color1R}, ${colors.color1G}, ${colors.color1B})`

}

function place() {
  stroke(colors.color2R, colors.color2G, colors.color2B);
  
  let pointX = map(x, -2.182, 2.656, 0, window.innerWidth / 2);
  let pointY = map(y, 0, 9.998, window.innerHeight, 0);
  point(pointX, pointY);
}

function generate() {
  let r = random(1);
  let xN, yN;
  if (r <= 0.01) {
    xN = 0;
    yN = 0.16 * y;
  } else if (r <= 0.86) {
    xN = 0.85 * x + 0.04 * y;
    yN = -0.04 * x + 0.85 * y + 1.6;
  } else if (r <= 0.93) {
    xN = 0.2 * x - 0.26 * y;
    yN = 0.23 * x + 0.22 * y + 1.6;
  } else {
    xN = -0.15 * x + 0.28 * y;
    yN = 0.26 * x + 0.24 * y + 0.44;
  }
  x = xN;
  y = yN;
}
  
function draw() {
  for (let i = 0; i < 1000; i++) {
    place();
    generate();
  }
}
