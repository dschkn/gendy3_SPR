// GENDY3 study — visual PARAG layer for mc.function.
// outlet 0: active mc.function line (1..4)
// outlet 1: "clear" or an x y breakpoint pair for that line

autowatch = 1;
outlets = 2;

var voices = 4;
var points = 14;
var xMax = 1000;
var yMin = 0.03;
var yMax = 0.97;

// Macro layer: exponential time fields and Bernoulli sounding fields.
var fieldMean = 78;
var soundingProbability = 0.72;

// Micro layer: Cauchy-distributed acceleration -> primary walk -> ordinate.
var cauchyScale = 0.010;
var primaryLimit = 0.070;
var amplitudeLimit = 0.47;

var state = [];

function u01() {
    var e = 0.000001;
    return e + (1 - 2 * e) * Math.random();
}

function cauchy(scale) {
    return scale * Math.tan(Math.PI * (u01() - 0.5));
}

function exponential(mean) {
    return -mean * Math.log(1 - u01());
}

function reflect(v, lo, hi) {
    if (!isFinite(v)) return (lo + hi) * 0.5;
    while (v < lo || v > hi) {
        if (v > hi) v = hi - (v - hi);
        if (v < lo) v = lo + (lo - v);
    }
    return v;
}

function initialise() {
    state = [];
    for (var v = 0; v < voices; v++) {
        state.push({ amplitude: (Math.random() * 2 - 1) * 0.18, velocity: 0 });
    }
}

function clear() {
    for (var v = 0; v < voices; v++) {
        outlet(0, v + 1);
        outlet(1, "clear");
    }
}

// Build one complete visual field per voice. X increments are exponential;
// y evolves with a bounded second-order random walk. Silent fields are drawn
// at the centre line, letting the visual score show the PARAG Bernoulli gate.
function generate() {
    if (state.length !== voices) initialise();
    clear();

    for (var v = 0; v < voices; v++) {
        var s = state[v];
        var x = 0;
        outlet(0, v + 1);
        outlet(1, 0, 0.5);

        for (var i = 0; i < points; i++) {
            x += Math.max(8, exponential(fieldMean));
            if (x > xMax) x = xMax;

            // Second order: random Cauchy impulse changes primary velocity,
            // then velocity changes the secondary amplitude position.
            s.velocity = reflect(s.velocity + cauchy(cauchyScale), -primaryLimit, primaryLimit);
            s.amplitude = reflect(s.amplitude + s.velocity, -amplitudeLimit, amplitudeLimit);

            var sounding = Math.random() < soundingProbability;
            var y = sounding ? reflect(0.5 + s.amplitude, yMin, yMax) : 0.5;
            outlet(1, x, y);
            if (x >= xMax) break;
        }
        outlet(1, xMax, 0.5);
    }
}

function bang() { generate(); }
function reset() { initialise(); clear(); }
function setpoints(n) { points = Math.max(2, Math.floor(n)); }
function setfieldmean(n) { fieldMean = Math.max(1, n); }
function setprobability(n) { soundingProbability = Math.max(0, Math.min(1, n)); }
function setcauchy(n) { cauchyScale = Math.max(0.00001, n); }
function setprimarylimit(n) { primaryLimit = Math.max(0.00001, n); }
function setamplitudelimit(n) { amplitudeLimit = Math.max(0.00001, Math.min(0.49, n)); }
function setvoices(n) { voices = Math.max(1, Math.min(16, Math.floor(n))); initialise(); }

initialise();
