canvas.width = canvas_parent.getBoundingClientRect().width;
canvas.height = canvas_parent.getBoundingClientRect().height;
var ctx = canvas.getContext("2d");
ctx.w = canvas.width;
ctx.h = canvas.height;
ctx.clearAll = () => ctx.clearRect(0, 0, ctx.w, ctx.h);
ctx.fillCircle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
};
