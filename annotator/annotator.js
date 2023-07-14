let canvas = document.getElementById("img");
let ctx = canvas.getContext('2d')
ctx.fillStyle = "#ff0074"
let info = document.getElementById("infodump")

window.addEventListener("paste", (event) => {
    event.preventDefault();
    retrieveImage(event, (imageBlob) => {
        if (imageBlob) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let img = new Image();

            img.onload = function() {
                canvas.width = this.width;
                canvas.height = this.height;
                ctx.drawImage(img, 0, 0);
            }

            let URLObj = window.URL || window.webkitURL;

            img.src = URLObj.createObjectURL(imageBlob);
        }
    })
})

function retrieveImage(pasteEvent, callback) {
    if (pasteEvent.clipboardData == false) {
        if (typeof(callback) == "function") {
            callback(undefined);
        }
    }
    let items = pasteEvent.clipboardData.items;
    if (items == undefined) {
        if (typeof(callback) == "function") {
            callback(undefined);
        }
    }

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") == -1) {
            continue;
        }
        let blob = items[i].getAsFile();
        if (typeof(callback) == "function") {
            callback(blob);
        }
    }
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log(`Coordinate x: ${x}
                Coordinate y: ${y}`);
    ctx.fillStyle = "#ff0074"
    info.innerHTML = `(${x}, ${y}) out of (${canvas.width}, ${canvas.height})`
    ctx.fillRect(x, y, 3, 3);
}
canvas.addEventListener("mousedown", function(event) {
    getMousePosition(canvas, event);
})