let ctx;
let mute = false;

function ensure(){
  if (ctx) return ctx;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

export function playClick(vol=0.05){
  if (mute) return;
  const a = ensure();
  const o = a.createOscillator();
  const g = a.createGain();
  o.type="square"; o.frequency.value=480+Math.random()*80;
  g.gain.value=vol;
  o.connect(g); g.connect(a.destination);
  o.start(); o.stop(a.currentTime+0.04);
}

export function toggleMuteUI(){
  mute=!mute;
  document.getElementById("mute").textContent = mute ? "🔇" : "🔈";
}
