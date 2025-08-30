const g = document.getElementById("shader");
const gl = g.getContext("webgl", { antialias: false, powerPreference: "low-power" });
const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let running = true;

function rs() {
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  g.width = innerWidth * dpr * (innerWidth < 768 ? 0.8 : 1);
  g.height = innerHeight * dpr * (innerWidth < 768 ? 0.8 : 1);
  gl.viewport(0, 0, g.width, g.height);
}
rs();
addEventListener("resize", rs);
document.addEventListener("visibilitychange", () => (running = !document.hidden));

const vs = `attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }`;
const fs = `
precision highp float;
uniform vec2 r; uniform float t;
float hash(vec2 p){ return fract(sin(dot(p,vec2(27.619,57.583)))*43758.5453); }
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*r)/r.y;
  float grid = abs(fract(uv.x*7.-t*.05)-.5)/.5 + abs(fract(uv.y*7.+t*.04)-.5)/.5;
  float glow = .04/(abs(uv.y)+.04) + .02/(abs(uv.x)+.05);
  float noise = (hash(floor(uv*80.+t))-0.5)*.06;
  float v = .12/grid + glow + noise;
  gl_FragColor = vec4(v*.0, v*.9, v*.6, 1.0);
}`;

function sh(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
gl.linkProgram(prog);
gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, "p");
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

const ur = gl.getUniformLocation(prog, "r");
const ut = gl.getUniformLocation(prog, "t");

(function draw(t) {
  requestAnimationFrame(draw);
  if (!running || prefersReduced) return;
  gl.uniform2f(ur, g.width, g.height);
  gl.uniform1f(ut, t * 0.0012); // slower for mobile
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
})();
