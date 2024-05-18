canvas.width = canvas_parent.getBoundingClientRect().width;
canvas.height = canvas_parent.getBoundingClientRect().height;

var ctx = canvas.getContext("2d");

ctx.w = canvas.width;
ctx.h = canvas.height;
ctx.clearAll = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.w, ctx.h);
};
ctx.fillCircle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
};

ctx.screenSpaceX = (x, sc) => Math.floor(3 * (ctx.w / 4) + (x * sc));
ctx.screenSpaceY = (y, sc) => Math.floor((ctx.h / 4) + (y * sc));
ctx.isInBounds = (arr, sc) => {
    let x = ctx.screenSpaceX(arr[0], sc);
    let y = ctx.screenSpaceY(arr[1], sc);
    return (x >= 0) && (y >= 0) && (x <= ctx.w) && (y <= ctx.h);
};

var defaultCfg = {
    type: "single-sector",
    dt_s: 0.001,
    instr: {
        plateDist_m: 0.006,
        plateCharge_C: 1e-18,
        bFieldStrength_T: 5e-6,
        bFieldStart_m: 0.25,
        bFieldEnd_m: 0.4,
        detectorDist_m: 0.9,
    },
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
var charge_C = particle => particle.attrs.charge * 1.60218e-19;

var badType = () => {
    throw new Error("Bad type");
};
