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

let particles = [];
let numParticles = 500;
let width = window.innerWidth - 10;
let height = window.innerHeight - 45;
let trailFactor = 10;

let noiseScale;
let trailScale;
let particleScale;

let index = Math.floor(Math.random() * colors_list.length);
let colors = colors_list[index];


function setup() {
    
    document.body.style.background = `rgb(${colors.color1R}, ${colors.color1G}, ${colors.color1B})`
    createCanvas(width, height);
    particleScale = createSlider(0, 500, 500, 50);

    for (let i = 0; i < particleScale.value(); i++) {
        particles.push(createVector(random(width), random(height)));
    }
    stroke(colors.color2R, colors.color2G, colors.color2B);
    
    noiseScale = createSlider(0, 1, 0.01, 0.01);
    trailScale = createSlider(0, 100, 90, 10);
    
}
  
function draw() {
    // background(colors, 100 - trailScale.value());
    background(colors.color1R, colors.color1G, colors.color1B, 100 - trailScale.value());
    for (let i = 0; i < particles.length; i++) {
        let current = particles[i];
        point(current.x, current.y);
        let noiseValue = noise(current.x * noiseScale.value(), current.y * noiseScale.value());
        let angle = TAU * noiseValue;
        current.x += cos(angle);
        current.y += sin(angle);
        if (current.x <= 0 || current.x >= width || current.y <= 0 || current.y >= height) {
            current.x = random(width);
            current.y = random(width);
        }
    }
}