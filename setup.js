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

ctx.screenSpaceX = (x, sc) => Math.floor((ctx.w / 2) + (x * sc));
ctx.screenSpaceY = (y, sc) => Math.floor((ctx.h / 4) + (y * sc));
ctx.isInBounds = (arr, sc) => {
    let x = ctx.screenSpaceX(arr[0], sc);
    let y = ctx.screenSpaceY(arr[1], sc);
    return (x >= 0) && (y >= 0) && (x <= ctx.w) && (y <= ctx.h);
};

// Found at https://stackoverflow.com/a/49434653
function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn(); // resample between 0 and 1
    return num - 0.5;
  }

var defaultCfg = {
    type: "single-sector",
    dt_s: 0.001,
    instr: {
        plateDist_m: 0.01,
        plateCharge_C: 1e-18,
        bFieldStrength_T: 5e-6,
        bFieldStart_m: 0.2,
        bFieldEnd_m: 0.4,
        detectorDist_m: 0.7,
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
