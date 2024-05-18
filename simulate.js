let particles;
let animate;

const SCALE = 500;
const DRAW_RADIUS = 5;

function simulate(cfg) {
    particles = [];
    for (const particleType of cfg.particleTypes) {
        for (let i = 0; i < particleType.count; i++) {
            particles.push({
                attrs: particleType.attrs,
                pos: startingPosition_m(cfg.type, i / (particleType.count - 1)),
                vel: [0, 0],
                active: true,
            });
        }
    }
    animate = () => {
        render();
        let someActive = false;
        for (let i = 0; i < particles.length; i++) {
            if (particles[i].active) {
                someActive = true;
                let force_N = computeForce_N(cfg.type, particles[i]);
                for (let j = 0; j < 2; j++) {
                    particles[i].vel[j] += (force_N[j] / mass_kg(particles[i])) * cfg.dt_s;
                    particles[i].pos[j] += particles[i].vel[j] * cfg.dt_s;
                }
                particles[i].active &&= isActive(cfg.type, particles[i].pos);
                particles[i].active &&= ctx.isInBounds(particles[i].pos, SCALE);
            }
        }
        if (someActive) requestAnimationFrame(animate); else render();
    };
    animate();
}

function startingPosition_m(type, _prog) {switch (type) {
    case "single-sector":
        return [0, 0];
}; badType()}

function computeForce_N(type, particle) {switch (type) {
    case "single-sector":
        return [0, 1e-27];
}; badType()}

function isActive(type, pos) {switch (type) {
    case "single-sector":
        return true;
}; badType()}

function drawParticle(particle) {
    ctx.fillStyle = particle.attrs.color;
    ctx.fillCircle(
        Math.floor((ctx.w / 2) + (particle.pos[0] * SCALE)),
        Math.floor((ctx.h / 2) + (particle.pos[1] * SCALE)),
        DRAW_RADIUS,
    );
}

function render() {
    console.log(particles[0].pos);
    ctx.clearAll();
    for (const particle of particles) {
        drawParticle(particle);
    }
}
