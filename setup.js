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

ctx.isInBounds = (arr, sc) => {
    let x = (ctx.w / 2) + (arr[0] * sc);
    let y = (ctx.h / 2) + (arr[1] * sc);
    return (x >= 0) && (y >= 0) && (x <= ctx.w) && (y <= ctx.h);
};

var defaultCfg = {
    type: "single-sector",
    dt_s: 0.01,
    particleTypes: [
        {
            attrs: {
                name: "Na+",
                color: "red",
                mass_amu: 22.990,
                charge: 1,
            },
            count: 10,
        },
        {
            attrs: {
                name: "K+",
                color: "blue",
                mass_amu: 39.098,
                charge: 1,
            },
            count: 10,
        },
    ],
};

var mass_kg = particle => particle.attrs.mass_amu * 1.66054e-27;

var badType = () => {
    throw new Error("Bad type");
};
