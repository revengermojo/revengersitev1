const feed = document.getElementById("term-feed");
const input = document.getElementById("term-input");

// Focus input on tap anywhere inside terminal
document.querySelector(".terminal")?.addEventListener("click", () => input.focus());

const banner = String.raw`
    ____  _______    _________   __________________  __  _______      ______ 
   / __ \/ ____/ |  / / ____/ | / / ____/ ____/ __ \/  |/  / __ \    / / __ \
  / /_/ / __/  | | / / __/ /  |/ / / __/ __/ / /_/ / /|_/ / / / /_  / / / / /
 / _, _/ /___  | |/ / /___/ /|  / /_/ / /___/ _, _/ /  / / /_/ / /_/ / /_/ / 
/_/ |_/_____/  |___/_____/_/ |_/\____/_____/_/ |_/_/  /_/\____/\____/\____/   
                          R E V E N G E R M O J O
`;

const help = `
commands:
  help        show this help
  banner      show ascii banner
  join        open WhatsApp invite
  labs        navigate to /labs
  blog        navigate to /blog
  courses     navigate to /courses
  whoami      identify
  motd        message of the day
  clear       clear terminal
`;

const motd = `we build elite minds. labs are coming online.`;

function write(line="") {
  const pre = document.createElement("pre");
  pre.textContent = line;
  feed.appendChild(pre);
  feed.scrollTop = feed.scrollHeight;
}

function run(cmd) {
  const c = cmd.trim().toLowerCase();
  if (!c) return;
  write("root@revengermojo:~$ " + c);
  switch (c) {
    case "help": write(help); break;
    case "banner": write(banner); break;
    case "join": window.open("https://chat.whatsapp.com/YOUR_WHATSAPP_INVITE","_blank"); break;
    case "labs": location.href="/labs"; break;
    case "blog": location.href="/blog"; break;
    case "courses": location.href="/courses"; break;
    case "whoami": write("operative"); break;
    case "motd": write(motd); break;
    case "clear": feed.innerHTML=""; break;
    default: write("unknown command. type 'help'");
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    run(input.value);
    input.value = "";
  }
});

write(banner);
write("type 'help'");
