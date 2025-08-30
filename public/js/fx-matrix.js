const c = document.getElementById("matrix");
const ctx = c.getContext("2d");
const dpr = Math.min(devicePixelRatio || 1, 1.5); // cap DPR for perf
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let running = true;

function size() {
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
size();
addEventListener("resize", size);

const glyphs = "アカサタナハマヤラワ0123456789$#░▒▓/\\|-";
let cols = [];
function reset() {
  const n = Math.floor(innerWidth / 16); // fewer cols on mobile
  cols = Array(n).fill(0).map(() => Math.floor(Math.random() * innerHeight));
}
reset();
addEventListener("resize", reset);

// pause when tab hidden
document.addEventListener("visibilitychange", () => (running = !document.hidden));

// adjust speed/fade
const stepY = prefersReduced ? 10 : innerWidth < 768 ? 14 : 16;
const fade = prefersReduced ? 0.12 : 0.08;

(function loop() {
  if (running) {
    ctx.fillStyle = `rgba(0,0,0,${fade})`;
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "#20ff9d";
    ctx.font = "14px monospace";
    cols.forEach((y, i) => {
      const t = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillText(t, i * 16, y);
      cols[i] = y > innerHeight + Math.random() * 200 ? 0 : y + stepY;
    });
  }
  requestAnimationFrame(loop);
})();
