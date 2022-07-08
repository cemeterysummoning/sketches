let particles = [];
let numParticles = 500;
let width = window.innerWidth - 10;
let height = window.innerHeight - 45;
let trailFactor = 10;

let noiseScale;
let particleScale;
let trailScale;

function setup() {
    createCanvas(width, height);
    particleScale = createSlider(0, 500, 500, 50);

    for (let i = 0; i < particleScale.value(); i++) {
        particles.push(createVector(random(width), random(height)));
    }
    stroke(255);
    noiseScale = createSlider(0, 1, 0.01, 0.01);
    trailScale = createSlider(0, 100, 90, 10);
    
}
  
function draw() {
    background(0, 100 - trailScale.value());
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
