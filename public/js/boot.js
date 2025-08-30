// Boot overlay typing + fadeout (mobile + desktop)
const boot = document.getElementById("boot");
const log = document.getElementById("bootlog");

const seq = [
  "[boot] revengermojo v2.0",
  "[ok] scanning hardware",
  "[ok] GPU online — shader grid engaged",
  "[ok] comms uplink",
  "[ok] entropy pool primed",
  "[ok] node mesh warming",
  "[*] decrypting secrets",
  "[+] welcome, operative",
  "----- press ENTER or TAP to continue -----",
];

let i = 0;
function typeLine() {
  if (i >= seq.length) return;
  log.textContent += seq[i] + "\n";
  i++;
  setTimeout(typeLine, 220);
}
typeLine();

function dismissBoot() {
  boot.classList.add("fadeout");
  setTimeout(() => (boot.style.display = "none"), 350);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") dismissBoot();
});
// mobile friendly
window.addEventListener("click", dismissBoot);
window.addEventListener("touchstart", dismissBoot, { passive: true });
