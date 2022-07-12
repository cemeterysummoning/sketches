let points = [];
let lowest;

let canvas = document.getElementById("container");

let width = window.innerWidth - 100, height = window.innerHeight - 100;

canvas.width = width;
canvas.height = height;
ctx = canvas.getContext("2d");
ctx.fillStyle = "#FFFFFF";

function addDot(event) {
    let xPos = event.pageX;
    let yPos = event.pageY;
    ctx.fillRect(xPos, yPos, 3, 3);
    points.push({
        x: xPos, 
        y: yPos,
        magnitude: Math.sqrt(xPos * xPos + yPos * yPos)
    });
}

canvas.addEventListener("click", addDot);


function findLowest() {
    let lowestIndex = 0;
    let lowestCoord = points[0].y;
    for (let i = 1; i < points.length; i++) {
        if (points[i].y > lowestCoord) {
            lowestIndex = i;
            lowestCoord = points[i].y;
        }
    }
    
    lowest = points.splice(lowestIndex, 1)[0];
    ctx.fillStyle = "#eb4034";
    ctx.fillRect(lowest.x, lowest.y, 3, 3);
    points.unshift(lowest);
}

function sortAngle() {
    for (let point of points) {
        point.polarAngle = Math.atan((point.y - lowest.y) / (point.x - lowest.x));
        if (point.polarAngle < 0) point.polarAngle += 3.14;
    }
    points.sort(function compare(a, b) {
        if (a.polarAngle > b.polarAngle) return -1;
        if (a.polarAngle < b.polarAngle) return 1;
        return 0;
    });

    ctx.font = "10px Arial"
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < points.length; i++) {
        ctx.fillText(`point ${i}`, points[i].x + 5, points[i].y);
    }
    
}

function isRight(point, top, next) {
    let d = (top.x - point.x) * (next.y - point.y) - (top.y - point.y) * (next.x - point.x);
    return d >= 0;
}

function findHull() {
    findLowest();
    sortAngle();
    let stack = [];
    stack.push(points[0]);
    stack.push(points[1]);
    for (let i = 2; i < points.length; i++) {
        while (stack.length > 2 && isRight(stack[stack.length - 2], stack[stack.length - 1], points[i])) {
            stack.pop();
        }
        stack.push(points[i]);
    }


    ctx.strokeStyle = "#FFFFFF"

    for (let i = 0; i < stack.length - 1; i++) {
        ctx.moveTo(stack[i].x, stack[i].y);
        ctx.lineTo(stack[i + 1].x, stack[i + 1].y);
        ctx.stroke();
    }
    ctx.moveTo(stack[stack.length - 1].x, stack[stack.length - 1].y);
    ctx.lineTo(stack[0].x, stack[0].y);
    ctx.stroke();
}

let button = document.getElementById("start");
button.onclick = function() {
    canvas.removeEventListener("click", addDot);
    findHull();
}