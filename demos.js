/* FuTech sample projects: six fully different concept sites, each with its own layout, style and working demo interactions.
   Each demo renders inside a sandboxed iframe (see openProject in script.js). Edit text, prices and colours here. */
(() => {
  // Shared shell: reset, toast, and a tiny helper. `fn` is a real function whose code runs inside the demo page.
  const D = (css, body, fn) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box;margin:0}body{font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}button{font:inherit;cursor:pointer;border:0;color:inherit;background:none}ul{list-style:none;padding:0}.t{position:fixed;left:50%;bottom:16px;translate:-50% 24px;opacity:0;background:#111;color:#fff;padding:9px 16px;border-radius:99px;font-size:12px;transition:.25s;z-index:99;white-space:nowrap;pointer-events:none}.t.on{translate:-50% 0;opacity:1}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}${css}</style></head><body>${body}<div class="t" role="status"></div><script>const $=s=>document.querySelector(s),T=m=>{const t=$('.t');t.textContent=m;t.classList.add('on');clearTimeout(T.i);T.i=setTimeout(()=>t.classList.remove('on'),2200)};document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b)T(b.dataset.a+' — demo interaction')});(${fn})()<\/script></body></html>`;

  /* 1. SHARMA SWEETS: warm festive, serif, build-your-own gift box */
  const sweets = () => D(`
body{background:#FFF4E2;color:#4A1630;font-family:Georgia,serif;padding-bottom:76px}
.aw{height:30px;background:repeating-linear-gradient(90deg,#E5336D 0 36px,#fff 36px 72px);border-radius:0 0 18px 18px;box-shadow:0 8px 18px #e5336d30}
header{text-align:center;padding:20px 16px 4px}header small{display:block;font:700 10px system-ui;letter-spacing:.3em;color:#B5456A}header b{font-size:30px;font-style:italic}
h1{font-size:clamp(26px,5vw,40px);text-align:center;line-height:1.05;margin:10px 16px 6px}h1 i{color:#E5336D}
.sub{text-align:center;font:13px system-ui;color:#7B4B5E;margin:0 auto 18px;max-width:380px;padding:0 16px}
.wrap{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;padding:0 5%;max-width:780px;margin:auto}
.box{background:#fff;border-radius:24px;padding:18px;text-align:center;box-shadow:0 18px 36px -18px #7a1b3a55;align-self:start}
.slots{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}
.slot{aspect-ratio:1;border-radius:50%;background:#FFE9CC;display:grid;place-items:center;font-size:20px;box-shadow:inset 0 0 0 2px #FFD59C}.slot.f{animation:pop .35s}
@keyframes pop{from{transform:scale(.3)}}
#clr{font:700 12px system-ui;color:#B5456A;text-decoration:underline}
.pk{display:grid;gap:9px}.pk button{display:flex;align-items:center;gap:10px;background:#fff;border-radius:18px;padding:10px 12px;text-align:left;font:600 13px system-ui;color:#4A1630;box-shadow:0 8px 20px -12px #7a1b3a66;transition:transform .2s}.pk button:hover{transform:translateX(5px)}
.pk i{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:18px;background:var(--c)}.pk span{margin-left:auto;color:#B5456A}
.bar{position:fixed;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:center;padding:12px 5%;background:#4A1630;color:#fff;font:600 13px system-ui}.bar button{background:#25D366;color:#04361b;padding:10px 16px;border-radius:99px;font-weight:800}`,
  `<div class="aw"></div><header><small>SINCE 1974 · PURE GHEE</small><b>Sharma Sweets</b></header>
<h1>Pack a box of <i>happiness</i></h1><p class="sub">Pick up to 8 sweets, fresh from this morning’s batch.</p>
<div class="wrap"><div class="box"><b>Your gift box</b><div class="slots"></div><button id="clr">Clear box</button></div><div class="pk"></div></div>
<div class="bar"><span id="tt"></span><button data-a="Order on WhatsApp">Order on WhatsApp</button></div>`,
  () => {
    const S = [["🟤", "Gulab Jamun", 25, "#D9A47A"], ["🟠", "Motichoor Laddoo", 20, "#FFC48A"], ["◆", "Kaju Katli", 40, "#F3E6D2"], ["🌀", "Jalebi", 15, "#FFD36B"]];
    let box = [];
    const pk = $(".pk"), sl = $(".slots");
    pk.innerHTML = S.map((s, i) => `<button data-i="${i}"><i style="--c:${s[3]}">${s[0]}</i>${s[1]}<span>₹${s[2]}</span></button>`).join("");
    const draw = () => {
      sl.innerHTML = Array.from({ length: 8 }, (_, i) => box[i] != null ? `<div class="slot f" style="background:${S[box[i]][3]}">${S[box[i]][0]}</div>` : `<div class="slot"></div>`).join("");
      $("#tt").textContent = `${box.length} of 8 · ₹${box.reduce((a, i) => a + S[i][2], 0)}`;
    };
    pk.onclick = e => { const b = e.target.closest("button"); if (!b) return; if (box.length >= 8) return T("Box is full. Ready to order!"); box.push(+b.dataset.i); draw(); };
    $("#clr").onclick = () => { box = []; draw(); };
    draw();
  });

  /* 2. TANDOOR TALES: dark, moody, ember glow, menu tabs and table booking */
  const tandoor = () => D(`
body{background:#15100D;color:#F5E6D3;font-family:Georgia,serif}
header{display:flex;justify-content:space-between;align-items:center;padding:16px 6%;border-bottom:1px solid #ffffff14}header b{font-size:20px;font-style:italic}header span{font:11px system-ui;color:#F2A23A;letter-spacing:.08em}
.hero{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;align-items:center;padding:30px 6% 18px}
.hero small{font:700 10px system-ui;letter-spacing:.3em;color:#F2A23A}.hero h1{font-size:clamp(30px,6vw,50px);line-height:1;margin:10px 0 12px}.hero h1 i{color:#F2A23A}.hero p{font:13px/1.6 system-ui;color:#c9b39b;max-width:320px;margin-bottom:18px}
.cta{background:#D9652B;color:#fff;padding:11px 20px;border-radius:99px;font:700 13px system-ui}
.plate{position:relative;width:min(100%,230px);aspect-ratio:1;margin:auto;border-radius:50%;display:grid;place-items:center;font-size:62px;background:radial-gradient(circle at 35% 30%,#a65a2a,#3a1d10 70%);box-shadow:0 0 0 10px #2a1810,0 0 70px #d9652b66}
.plate:before{content:"";position:absolute;inset:-18px;border-radius:50%;border:2px dashed #f2a23a88;animation:r 18s linear infinite}@keyframes r{to{rotate:360deg}}
.menu,.res{margin:14px 6%;padding:18px;border-radius:20px;background:#201813;border:1px solid #ffffff10}
.tabs{display:flex;gap:8px;margin-bottom:10px}.tabs button,.chips button{padding:7px 14px;border-radius:99px;border:1px solid #ffffff22;font:600 12px system-ui;color:#c9b39b}.tabs .on,.chips .on{background:#F2A23A;color:#1b1209;border-color:#F2A23A}
.list li{display:flex;align-items:baseline;gap:8px;padding:11px 0;cursor:pointer;font-size:16px}.list li:hover{color:#F2A23A}.list i{flex:1;border-bottom:1px dotted #ffffff44}.list b{font:700 14px system-ui;color:#F2A23A}
.res>b{font-size:20px;font-style:italic}.row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 0;font:13px system-ui;color:#c9b39b}.chips{display:flex;gap:6px;flex-wrap:wrap}
.st{display:flex;align-items:center;gap:12px}.st button{width:30px;height:30px;border-radius:50%;border:1px solid #ffffff33;font-size:16px}.st b{min-width:18px;text-align:center;color:#fff;font:700 16px system-ui}.res .cta{width:100%;margin-top:6px}
footer{padding:14px 6% 70px;text-align:center;font:11px system-ui;color:#8b7a68}`,
  `<header><b>Tandoor Tales</b><span>OPEN TODAY · 12 PM – 11 PM</span></header>
<section class="hero"><div><small>FIRE · SMOKE · FAMILY</small><h1>Slow fire,<br><i>big flavour.</i></h1><p>Clay-oven kebabs, slow-cooked dals and breads straight from the tandoor.</p><button class="cta" data-a="Open full menu">View full menu</button></div><div class="plate">🍢</div></section>
<section class="menu"><div class="tabs"></div><ul class="list"></ul></section>
<section class="res"><b>Reserve a table</b><div class="row"><span>Guests</span><div class="st"><button id="m" aria-label="Fewer">−</button><b id="g">2</b><button id="p" aria-label="More">+</button></div></div><div class="row"><span>Time</span><div class="chips"></div></div><button class="cta" id="go">Confirm table</button></section><footer>Concept demo · Fictional restaurant</footer>`,
  () => {
    const M = { Starters: [["Paneer Tikka", 280], ["Hara Bhara Kebab", 240], ["Chicken Seekh", 320]], Mains: [["Dal Makhani", 260], ["Butter Chicken", 340], ["Kadai Paneer", 290]], Breads: [["Butter Naan", 60], ["Garlic Naan", 75], ["Laccha Paratha", 70]] };
    let cur = "Starters", g = 2, tm = "8:00 pm";
    const tabs = $(".tabs"), list = $(".list"), chips = $(".chips");
    const draw = () => {
      tabs.innerHTML = Object.keys(M).map(k => `<button class="${k === cur ? "on" : ""}" data-k="${k}">${k}</button>`).join("");
      list.innerHTML = M[cur].map(([n, p]) => `<li data-a="${n} added to order"><span>${n}</span><i></i><b>₹${p}</b></li>`).join("");
    };
    tabs.onclick = e => { const b = e.target.closest("[data-k]"); if (b) { cur = b.dataset.k; draw(); } };
    chips.innerHTML = ["7:30 pm", "8:00 pm", "8:30 pm", "9:00 pm"].map(t => `<button class="${t === tm ? "on" : ""}">${t}</button>`).join("");
    chips.onclick = e => { const b = e.target.closest("button"); if (!b) return; tm = b.textContent; [...chips.children].forEach(c => c.classList.toggle("on", c === b)); };
    $("#m").onclick = () => { g = Math.max(1, g - 1); $("#g").textContent = g; };
    $("#p").onclick = () => { g = Math.min(12, g + 1); $("#g").textContent = g; };
    $("#go").onclick = () => T(`Table for ${g} at ${tm} reserved (demo)`);
    draw();
  });

  /* 3. BRIGHTPATH CLASSES: bright blue, grid-paper, batch picker with seat meter and fee switch */
  const brightpath = () => D(`
body{background:linear-gradient(#2f5bff12 1px,transparent 1px) 0 0/28px 28px,linear-gradient(90deg,#2f5bff12 1px,transparent 1px) 0 0/28px 28px,#F2F7FF;color:#12205F}
header{display:flex;justify-content:space-between;align-items:center;padding:16px 6%}.lg{display:flex;align-items:center;gap:8px;font:800 19px system-ui}.lg i{width:26px;height:26px;border-radius:8px;background:#2F5BFF;display:block;box-shadow:4px 4px 0 #FFC83D}
header button{padding:8px 14px;border-radius:10px;border:2px solid #12205F;font-weight:700;font-size:12px}
.hero{padding:16px 6% 10px}.hero small{font:800 10px system-ui;letter-spacing:.18em;color:#2F5BFF}.hero h1{font-size:clamp(30px,6vw,46px);line-height:1.02;margin:8px 0 10px;letter-spacing:-.03em;font-weight:800}.hero mark{background:linear-gradient(transparent 55%,#FFC83D 55%);color:inherit}.hero p{color:#4a5a99;max-width:380px}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:16px}.facts div{background:#fff;border:2px solid #12205F;border-radius:14px;padding:10px;font-size:11px;color:#4a5a99;box-shadow:3px 3px 0 #12205F}.facts b{display:block;font:800 20px system-ui;color:#2F5BFF}
.pick{padding:18px 6% 70px}.pick h2{font-size:18px;margin-bottom:10px}.bt{display:grid;gap:10px}
.bc{display:grid;grid-template-columns:1fr auto;gap:2px 10px;text-align:left;background:#fff;border:2px solid #cdd8ff;border-radius:16px;padding:12px 14px;transition:.2s}.bc.on{border-color:#2F5BFF;box-shadow:4px 4px 0 #2F5BFF}.bc b{font-size:15px}.bc small{color:#6a79b5}.bc em{grid-row:span 2;align-self:center;font:800 12px system-ui;font-style:normal;color:#2F5BFF;text-align:right}
.mt{grid-column:1/-1;height:6px;border-radius:9px;background:#e1e8ff;margin-top:6px;overflow:hidden}.mt s{display:block;height:100%;background:#2F5BFF;transition:width .5s}
.sw{display:inline-flex;margin:14px 0 4px;background:#fff;border:2px solid #12205F;border-radius:99px;padding:3px}.sw button{padding:6px 14px;border-radius:99px;font:700 12px system-ui}.sw .on{background:#12205F;color:#fff}
.sum{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px;background:#12205F;color:#fff;border-radius:18px;padding:14px 16px}.sum small{opacity:.7;display:block}.sum b{font:800 24px system-ui}.sum button{background:#FFC83D;color:#12205F;padding:11px 18px;border-radius:12px;font-weight:800}`,
  `<header><div class="lg"><i></i>BrightPath</div><button data-a="Call the centre">Call us</button></header>
<section class="hero"><small>CLASSES 8–12 · SMALL BATCHES</small><h1>Learn it once.<br><mark>Get it right.</mark></h1><p>Small batches, weekly tests and a mentor who knows your name.</p><div class="facts"><div><b>12</b>seats per batch</div><div><b>6</b>days a week</div><div><b>Weekly</b>progress test</div></div></section>
<section class="pick"><h2>Choose your batch</h2><div class="bt"></div><div class="sw"><button class="on" data-m="1">Monthly</button><button data-m="3">Term · save 10%</button></div><div class="sum"><div><small id="fl">Fee</small><b id="fee"></b></div><button id="go">Book a free demo class</button></div></section>`,
  () => {
    const B = [["Class 9 Foundation", "Mon–Sat · 5:00 pm", 4, 2400], ["Class 10 Boards", "Mon–Sat · 6:00 pm", 2, 2800], ["JEE Starter", "Mon–Fri · 7:00 pm", 7, 3200]];
    let sel = 0, m = 1;
    const bt = $(".bt"), inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
    const draw = () => {
      bt.innerHTML = B.map((b, i) => `<button class="bc ${i === sel ? "on" : ""}" data-i="${i}"><b>${b[0]}</b><em>${b[2]} seats left</em><small>${b[1]}</small><span class="mt"><s style="width:${(12 - b[2]) / 12 * 100}%"></s></span></button>`).join("");
      const fee = B[sel][3] * m * (m === 3 ? .9 : 1);
      $("#fee").textContent = inr(fee); $("#fl").textContent = m === 3 ? "Fee for 3 months" : "Fee per month";
    };
    bt.onclick = e => { const b = e.target.closest("[data-i]"); if (b) { sel = +b.dataset.i; draw(); } };
    $(".sw").onclick = e => { const b = e.target.closest("[data-m]"); if (!b) return; m = +b.dataset.m; [...$(".sw").children].forEach(c => c.classList.toggle("on", c === b)); draw(); };
    $("#go").onclick = () => T(`Free demo booked for ${B[sel][0]} (demo)`);
    draw();
  });

  /* 4. ORBIT LABS: dark space startup page with animated orbit and a waitlist form */
  const orbit = () => D(`
body{background:radial-gradient(circle at 70% 0,#3a2aa855,transparent 55%),#080C26;color:#fff;min-height:100vh;overflow-x:hidden}
body:before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(1px 1px at 12% 20%,#fff,transparent),radial-gradient(1.5px 1.5px at 40% 12%,#fff,transparent),radial-gradient(1px 1px at 88% 60%,#fff,transparent),radial-gradient(1.5px 1.5px at 60% 85%,#fff,transparent),radial-gradient(1px 1px at 25% 70%,#fff,transparent),radial-gradient(1px 1px at 78% 30%,#fff,transparent)}
nav{position:relative;display:flex;justify-content:space-between;align-items:center;padding:16px 6%}nav b{letter-spacing:.04em}nav button{padding:7px 14px;border-radius:99px;border:1px solid #ffffff33;font-size:12px}
.hero{position:relative;text-align:center;padding:10px 6% 20px}
.orb{position:relative;width:170px;height:130px;margin:0 auto 6px}.pl{position:absolute;left:50%;top:50%;width:84px;height:84px;translate:-50% -50%;border-radius:50%;background:radial-gradient(circle at 32% 30%,#C9B8FF,#7A5CFF 45%,#2A1A7A);box-shadow:0 0 50px #7a5cff99}
.ring{position:absolute;inset:0;margin:auto;width:170px;height:170px;top:-20px;border-radius:50%;border:1px solid #ffffff44;transform:rotate(-18deg) scaleY(.4)}.mn{position:absolute;inset:0;animation:o 6s linear infinite}.mn:after{content:"";position:absolute;left:50%;top:-6px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#fff;box-shadow:0 0 14px #fff;transform:scaleY(2.5)}@keyframes o{to{rotate:360deg}}
.hero small{font:700 10px system-ui;letter-spacing:.3em;color:#b9a6ff}.hero h1{font-size:clamp(32px,7vw,54px);line-height:1;margin:10px 0 10px;letter-spacing:-.04em}.hero h1 em{font-style:normal;background:linear-gradient(90deg,#b9a6ff,#ff6fa5);-webkit-background-clip:text;background-clip:text;color:transparent}.hero p{color:#aab0d8;max-width:360px;margin:0 auto 18px}
.f{display:flex;gap:6px;max-width:380px;margin:auto;padding:5px;border-radius:99px;background:#ffffff12;border:1px solid #ffffff2a}.f input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;padding:0 14px;font:inherit}.f input::placeholder{color:#8b92c4}.f button{padding:10px 16px;border-radius:99px;background:linear-gradient(90deg,#7A5CFF,#E5336D);font-weight:700;font-size:13px}
#msg{min-height:22px;margin-top:10px;font-size:13px;color:#ffb3cf}#msg.ok{color:#8ff0c0}
.ft{position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;padding:8px 6% 40px}.ft div{padding:14px;border-radius:16px;background:#ffffff0d;border:1px solid #ffffff1a;font-size:12px;color:#aab0d8;transition:.25s}.ft div:hover{transform:translateY(-4px);background:#ffffff18}.ft b{display:block;color:#fff;font-size:14px}.ft s{text-decoration:none;color:#b9a6ff;font-size:18px}`,
  `<nav><b>◉ Orbit Labs</b><button data-a="Sign in">Sign in</button></nav>
<section class="hero"><div class="orb"><div class="pl"></div><div class="ring"><div class="mn"></div></div></div><small>PRIVATE BETA · 2026</small><h1>Build what<br><em>comes next.</em></h1><p>A launchpad for ambitious teams turning bold ideas into useful products.</p><div class="f"><input id="e" type="email" placeholder="you@company.com" aria-label="Email address"><button id="j">Join waitlist</button></div><div id="msg" role="status"></div></section>
<section class="ft"><div><s>✳</s><b>Discover</b>Find your next idea</div><div><s>↗</s><b>Build</b>Plans into products</div><div><s>◎</s><b>Launch</b>Grow with intention</div></section>`,
  () => {
    let n = 2481;
    const go = () => {
      const v = $("#e").value.trim(), m = $("#msg");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { m.className = ""; m.textContent = "Please enter a valid email address."; return; }
      n++; m.className = "ok"; m.textContent = `You're in! You are #${n.toLocaleString("en-IN")} on the waitlist (demo).`; $("#e").value = "";
    };
    $("#j").onclick = go; $("#e").onkeydown = e => { if (e.key === "Enter") go(); };
  });

  /* 5. MAYA DESIGNS: editorial cream portfolio, huge serif type, filterable work grid */
  const maya = () => D(`
body{background:#F4EADB;color:#2B1B14;font-family:Georgia,serif;display:grid;grid-template-columns:34px 1fr;min-height:100vh}
aside{writing-mode:vertical-rl;rotate:180deg;font:700 10px system-ui;letter-spacing:.35em;color:#C4552D;display:grid;place-items:center;border-right:1px solid #2b1b1422}
main{padding:16px 5% 70px;min-width:0}nav{display:flex;justify-content:space-between;align-items:center}nav b{font-size:18px;font-style:italic}nav button{font:700 12px system-ui;border-bottom:2px solid #C4552D;padding-bottom:2px}
h1{font-size:clamp(34px,8vw,68px);line-height:.95;letter-spacing:-.04em;font-weight:400;margin:22px 0 10px}h1 i{color:#C4552D}.lead{font:13px/1.6 system-ui;color:#6b5648;max-width:340px;margin-bottom:16px}
.f{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}.f button{padding:6px 13px;border-radius:99px;border:1px solid #2b1b1455;font:600 12px system-ui}.f .on{background:#2B1B14;color:#F4EADB}
.gr{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px}
.tl{text-align:left;transition:transform .3s,opacity .3s}.tl:hover{transform:translateY(-4px) rotate(-1deg)}.tl.off{display:none}
.art{aspect-ratio:1;border-radius:6px;position:relative;overflow:hidden;background:var(--bg)}.art:before,.art:after{content:"";position:absolute}
.a1:before{width:60%;aspect-ratio:1;border-radius:50%;background:var(--fg);left:20%;top:20%}.a2:before{width:56%;height:70%;border-radius:99px 99px 0 0;background:var(--fg);left:22%;bottom:0}
.a3:before{inset:0;background:repeating-linear-gradient(90deg,var(--fg) 0 8%,transparent 8% 16%)}.a4:before{inset:18%;background:conic-gradient(var(--fg) 25%,transparent 0 50%,var(--fg) 0 75%,transparent 0)}
.tl b{display:block;font-size:14px;font-weight:400;margin-top:6px}.tl small{font:700 9px system-ui;letter-spacing:.14em;color:#C4552D}
.cap{margin-top:16px;padding:14px 16px;border-left:3px solid #C4552D;background:#fff8;font:13px/1.5 system-ui;color:#4d3a2f}`,
  `<aside>PORTFOLIO ’26</aside><main><nav><b>Maya Designs</b><button data-a="Start a project">Let’s talk</button></nav>
<h1>Design with<br><i>a point of view.</i></h1><p class="lead">Independent studio for brand identities, websites and print.</p><div class="f"></div><div class="gr"></div><p class="cap" id="cap">Tap a project to read its story.</p></main>`,
  () => {
    const P = [["Chai & Co", "BRAND", "a1", "#F2B5A0", "#C4552D"], ["Nilgiri Tea", "PRINT", "a2", "#CFE0CF", "#4E7A58"], ["Studio Lune", "WEB", "a3", "#2B1B14", "#E9A23B"], ["Kala Market", "BRAND", "a4", "#E9A23B", "#2B1B14"], ["Orchard", "WEB", "a2", "#F7D9A8", "#C4552D"], ["Zari", "PRINT", "a1", "#2B1B14", "#F2B5A0"]];
    let cur = "ALL";
    const f = $(".f"), gr = $(".gr");
    f.innerHTML = ["ALL", "BRAND", "WEB", "PRINT"].map(c => `<button class="${c === cur ? "on" : ""}">${c[0] + c.slice(1).toLowerCase()}</button>`).join("");
    gr.innerHTML = P.map((p, i) => `<button class="tl" data-i="${i}" data-c="${p[1]}"><div class="art ${p[2]}" style="--bg:${p[3]};--fg:${p[4]}"></div><b>${p[0]}</b><small>${p[1]}</small></button>`).join("");
    f.onclick = e => { const b = e.target.closest("button"); if (!b) return; cur = b.textContent.toUpperCase(); [...f.children].forEach(c => c.classList.toggle("on", c === b)); [...gr.children].forEach(t => t.classList.toggle("off", cur !== "ALL" && t.dataset.c !== cur)); };
    gr.onclick = e => { const t = e.target.closest(".tl"); if (t) $("#cap").textContent = `Case study: ${P[t.dataset.i][0]} · ${P[t.dataset.i][1].toLowerCase()} project, delivered in 6 weeks (sample).`; };
  });

  /* 6. URBAN THREADS: clean fashion store with colour/size pickers and a live bag */
  const urban = () => D(`
body{background:#fff;color:#0B2B33}
header{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:14px 5%;background:#ffffffee;backdrop-filter:blur(8px);border-bottom:1px solid #0b2b3314}header b{letter-spacing:.3em;font-size:13px}#bag{font:700 12px system-ui;padding:7px 14px;border-radius:99px;background:#0B2B33;color:#fff;transition:transform .2s}#bag.bump{transform:scale(1.12)}
.hero{padding:26px 5% 14px;background:linear-gradient(120deg,#EEF4F3,#fff)}.hero small{font:700 10px system-ui;letter-spacing:.3em;color:#1D6E8C}.hero h1{font-size:clamp(30px,7vw,52px);line-height:1;letter-spacing:-.045em;margin-top:6px}
.gr{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;padding:14px 5% 60px}
.pc{border:1px solid #0b2b3318;border-radius:16px;padding:12px;transition:box-shadow .3s,transform .3s}.pc:hover{box-shadow:0 18px 30px -18px #0b2b3366;transform:translateY(-3px)}
.ph{height:150px;border-radius:12px;background:#EEF4F3;display:grid;place-items:center}.ph i{display:block;width:96px;height:112px;background:var(--c);clip-path:var(--cp);transition:background .3s}
.pc h3{font-size:14px;margin-top:10px}.pc p{font:700 13px system-ui;color:#1D6E8C}
.sw{display:flex;gap:6px;margin:8px 0}.sw button{width:20px;height:20px;border-radius:50%;background:var(--c);box-shadow:0 0 0 2px #fff,0 0 0 3px #0b2b3333}.sw .on{box-shadow:0 0 0 2px #fff,0 0 0 4px #0B2B33}
.sz{display:flex;gap:4px;margin-bottom:10px}.sz button{flex:1;padding:4px 0;border:1px solid #0b2b3333;border-radius:7px;font:600 11px system-ui}.sz .on{background:#0B2B33;color:#fff}
.add{width:100%;padding:9px;border-radius:10px;background:#1D6E8C;color:#fff;font:700 12px system-ui}.add:hover{background:#0B2B33}`,
  `<header><b>URBAN THREADS</b><button id="bag">Bag (<span id="n">0</span>)</button></header>
<section class="hero"><small>NEW SEASON EDIT</small><h1>Wear your own<br>kind of story.</h1></section><section class="gr"></section>`,
  () => {
    const TEE = "polygon(30% 0,40% 8%,60% 8%,70% 0,100% 18%,88% 38%,76% 30%,76% 100%,24% 100%,24% 30%,12% 38%,0 18%)";
    const SHIRT = "polygon(28% 0,42% 9%,58% 9%,72% 0,100% 12%,100% 70%,86% 70%,82% 28%,78% 100%,22% 100%,18% 28%,14% 70%,0 70%,0 12%)";
    const TRO = "polygon(22% 0,78% 0,86% 100%,56% 100%,50% 36%,44% 100%,14% 100%)";
    const P = [["Everyday tee", 899, TEE, ["#1D6E8C", "#E5336D", "#222"]], ["Studio overshirt", 1899, SHIRT, ["#0B2B33", "#B8864B", "#7FA9A0"]], ["Relaxed trousers", 1499, TRO, ["#C9A27A", "#394A52", "#8E3B46"]]];
    const S = P.map(() => ({ c: 0, s: "M" }));
    let n = 0, tot = 0;
    const gr = $(".gr"), inr = v => "₹" + v.toLocaleString("en-IN");
    const draw = () => {
      gr.innerHTML = P.map((p, i) => `<article class="pc" data-i="${i}"><div class="ph"><i style="--c:${p[3][S[i].c]};--cp:${p[2]}"></i></div><h3>${p[0]}</h3><p>${inr(p[1])}</p><div class="sw">${p[3].map((c, j) => `<button data-c="${j}" aria-label="Colour ${j + 1}" class="${j === S[i].c ? "on" : ""}" style="--c:${c}"></button>`).join("")}</div><div class="sz">${["S", "M", "L", "XL"].map(z => `<button data-s="${z}" class="${z === S[i].s ? "on" : ""}">${z}</button>`).join("")}</div><button class="add">Add to bag</button></article>`).join("");
    };
    gr.onclick = e => {
      const card = e.target.closest(".pc"); if (!card) return; const i = +card.dataset.i, b = e.target.closest("button"); if (!b) return;
      if (b.dataset.c) S[i].c = +b.dataset.c; else if (b.dataset.s) S[i].s = b.dataset.s;
      else if (b.classList.contains("add")) { n++; tot += P[i][1]; $("#n").textContent = n; $("#bag").classList.add("bump"); setTimeout(() => $("#bag").classList.remove("bump"), 250); T(`${P[i][0]} (${S[i].s}) added to bag`); return; }
      draw();
    };
    $("#bag").onclick = () => T(n ? `Bag: ${n} item${n > 1 ? "s" : ""} · ${inr(tot)} (demo)` : "Your bag is empty");
    draw();
  });

  window.FT_DEMOS = { "Sharma Sweets": sweets, "Tandoor Tales": tandoor, "BrightPath Classes": brightpath, "Orbit Labs": orbit, "Maya Designs": maya, "Urban Threads": urban };
})();
