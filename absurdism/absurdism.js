const hangul = 'ㅂㅈㄷㄳㄱㅅㅁㄴㅇㅀㄹㅎㅋㅌㅊㅍㅛㅕㅑㅐㅔㅓㅏㅣㅗㅜㅡㅠㅃㅉㄸㄲㅆㅒㅖ'
const alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVNMB'
const num = '1234567890'

const text = hangul + alphabet + num

const canvas = document.getElementById("matrix");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

const quote = "Maman died today"

const raindrops = Array.from({ length: columns }).fill(canvas.height);

let indices = new Array(columns);

for (i = 0; i < columns; i++) {
    indices[i] = i
}

function draw() {
    context.fillStyle = 'rgba(0, 26, 31, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = `${fontSize}px monospace`;

    for (let j = 0; j < indices.length; j++) {
        i = indices[j]
        if (Math.random() > 0.99) {
            context.fillStyle = "#D05353"
        } else {
            context.fillStyle = "#F1E8B8";
        }
        let render = text.charAt(Math.floor(Math.random() * text.length));
        context.fillText(render, i * fontSize, raindrops[i] * fontSize);

        if (raindrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            raindrops[i] = 0;
        }
        raindrops[i]++;
    }
}

function checkzeroes(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            return true;
        }
    }
    return false;
}

if (checkzeroes(indices)) {
    setInterval(draw, 50);
}
