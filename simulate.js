let x;

function reset() {
    x = 0;
}

function update() {
    x += 1;
}

function simulate() {
    if (x < ctx.w) {
        ctx.fillStyle = "white";
        ctx.fillCircle(x, ctx.h / 2, 20);
        console.log(x);
        update();
        requestAnimationFrame(simulate);
    }
}
