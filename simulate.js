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
        ctx.clearAll();
        renderInstrument(cfg);
        for (const particle of particles) {
            renderParticle(particle);
        }
        let someActive = false;
        for (let i = 0; i < particles.length; i++) {
            if (particles[i].active) {
                someActive = true;
                let force_N = computeForce_N(cfg, particles[i]);
                for (let j = 0; j < 2; j++) {
                    particles[i].vel[j] += (force_N[j] / mass_kg(particles[i])) * cfg.dt_s;
                    particles[i].pos[j] += particles[i].vel[j] * cfg.dt_s;
                }
                particles[i].active &&= isActive(cfg, particles[i].pos);
                particles[i].active &&= ctx.isInBounds(particles[i].pos, SCALE);
            }
        }
        if (someActive) requestAnimationFrame(animate);
    };
    animate();
}

function startingPosition_m(type, _prog) {switch (type) {
    case "single-sector":
        return [0, 0];
}; badType()}

const KE = 8.98755e9;

function computeForce_N(cfg, particle) {switch (cfg.type) {
    case "single-sector":
        let fx = 0;
        let fy = 0;
        let y = particle.pos[1];
        let r = Math.abs(y - cfg.instr.plateDist_m);
        let z = charge_C(particle);
        let columbForce = KE * z * cfg.instr.plateCharge_C / (r * r);
        fy += columbForce;
        if ((y > cfg.instr.bFieldStart_m) && (y < cfg.instr.bFieldEnd_m)) {
            let magneticFac = z * cfg.instr.bFieldStrength_T;
            fx -= particle.vel[1] * magneticFac;
            fy += particle.vel[0] * magneticFac;
        } 
        return [fx, fy];
}; badType()}

function isActive(cfg, pos) {switch (cfg.type) {
    case "single-sector":
        return pos[1] < cfg.instr.detectorDist_m;
}; badType()}

function renderParticle(particle) {
    console.log(randn());
    ctx.fillStyle = particle.attrs.color;
    ctx.fillCircle(
        ctx.screenSpaceX(particle.pos[0], SCALE),
        ctx.screenSpaceY(particle.pos[1], SCALE),
        DRAW_RADIUS,
    );
}

const LINEWIDTH = 2;

function renderInstrument(cfg) {switch (cfg.type) {
    case "single-sector":
        {
            ctx.fillStyle = "purple";
            let y = ctx.screenSpaceY(cfg.instr.plateDist_m, SCALE);
            ctx.fillRect(0, y, ctx.w, LINEWIDTH);
        }
        {
            ctx.fillStyle = "green";
            let y1 = ctx.screenSpaceY(cfg.instr.bFieldStart_m, SCALE);
            let y2 = ctx.screenSpaceY(cfg.instr.bFieldEnd_m, SCALE);
            ctx.fillRect(0, y1, ctx.w, y2 - y1);
        }
        {
            ctx.fillStyle = "orange";
            let y = ctx.screenSpaceY(cfg.instr.detectorDist_m, SCALE);
            ctx.fillRect(0, y, ctx.w, LINEWIDTH);
        }
        return;
}; badType()}
