const hangul = 'ㅂㅈㄷㄳㄱㅅㅁㄴㅇㅀㄹㅎㅋㅌㅊㅍㅛㅕㅑㅐㅔㅓㅏㅣㅗㅜㅡㅠㅃㅉㄸㄲㅆㅒㅖ'
const alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVNMB'
const num = '1234567890'

const text = hangul + alphabet + num

const canvas = document.getElementById("matrix");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;

const raindrops = Array.from({ length: columns }).fill(canvas.height);;

function draw() {
    context.fillStyle = 'rgba(0, 26, 31, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (Math.random() > 0.9) {
        context.fillStyle = "#D05353"
    } else {
        context.fillStyle = "#F1E8B8";
    }
    context.font = `${fontSize}px monospace`;

    for (let i = 0; i < raindrops.length; i++) {
        let render = text.charAt(Math.floor(Math.random() * text.length));
        context.fillText(render, i * fontSize, raindrops[i] * fontSize);

        if (raindrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            raindrops[i] = 0;
        }
        raindrops[i]++;
    }
}

setInterval(draw, 75);