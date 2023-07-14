function main(scale, c, t) {
    let container = document.getElementById("canv");
    let canvas = document.createElement("canvas");
    canvas.id = "lorenz";

    canvas.width = window.innerWidth * 3 / 4;
    canvas.height = window.innerHeight;

    canvas.style.display = "inline-block";
    canvas.style.maxWidth = "100%";
    canvas.style.maxHeight = "100%";

    container.appendChild(canvas);
    let context = canvas.getContext("2d"),
        h = 0.015,
        x0 = 0, 
        y0 = 1, 
        z0 = 10,
        x1,
        y1,
        z1,
        cx = canvas.width / 2,
        cy = canvas.height / 2

    let ani;

    let scaleRange = document.getElementById("scale");
    let cRange = document.getElementById("c");
    let tRange = document.getElementById("t");
    
    let scaleVal = document.getElementById("scale-value");
    let cVal = document.getElementById("c-value");
    let tVal = document.getElementById("t-value");

    scaleRange.oninput = function() {
        container.innerHTML = "";
        cancelAnimationFrame(ani);
        main(this.value, c, t);
        scaleVal.innerHTML = `scale: ${this.value}`;
    }
    cRange.oninput = function() {
        container.innerHTML = "";
        cancelAnimationFrame(ani);
        main(scale, this.value, t);
        cVal.innerHTML = `c: ${this.value}`;
    }
    tRange.oninput = function() {
        container.innerHTML = "";
        cancelAnimationFrame(ani);
        main(scale, c, this.value);
        tVal.innerHTML = `t: ${this.value}`
    }

    function animate() {
        x1 = x0 + h * t * (x0 - y0);
        y1 = y0 + h * (-x0 * z0 + c * x0 - y0);
        z1 = z0 + h * (x0 * y0 - z0);

        context.strokeStyle = `rgb(${Math.abs(x1)*10}, ${Math.abs(y1)*10}, ${Math.abs(z1)*2})`;
        
        context.beginPath();
        context.moveTo(cx + x0 * scale, cy + y0 * scale);
        context.lineTo(cx + x1 * scale, cy + y1 * scale);
        context.stroke();

        x0 = x1;
        y0 = y1;
        z0 = z1;

        ani = requestAnimationFrame(animate);
    }
    ani = requestAnimationFrame(animate);
}
main(15, 28, -6);