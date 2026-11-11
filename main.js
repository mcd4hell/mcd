(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => requestAnimationFrame(() => root.classList.add("is-loaded")));

  /* ---------- liquid glass drop (WebGL) ---------- */
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector(".hero__gl");
  const word = document.querySelector(".wordmark");

  // size the wordmark so its letters span the full content width
  function fitWord() {
    if (!word) return;
    const cs = getComputedStyle(word);
    const avail = word.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    let natural = 0;
    for (const s of word.children) natural += s.getBoundingClientRect().width;
    if (natural > 0) word.style.fontSize = (parseFloat(cs.fontSize) * avail / natural * 0.99) + "px";
  }

  const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
  const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uPos;
uniform float uR;
uniform float uTime;

float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0); return mix(b, a, h) - k*h*(1.0-h); }

float field(vec2 p){
  float t = uTime;
  vec2 c1 = uPos + vec2(cos(t*0.61), sin(t*0.83)) * uR * 0.22;
  vec2 c2 = uPos + vec2(cos(t*0.47 + 2.1), sin(t*0.59 + 1.3)) * uR * 0.78;
  vec2 c3 = uPos + vec2(cos(t*0.73 + 4.2), sin(t*0.41 + 2.9)) * uR * 0.66;
  float d = length(p - c1) - uR;
  d = smin(d, length(p - c2) - uR*0.5, uR*0.55);
  d = smin(d, length(p - c3) - uR*0.36, uR*0.5);
  return d;
}

vec3 tex(vec2 px){ return texture2D(uTex, clamp(px / uRes, 0.0, 1.0)).rgb; }

vec3 iris(float a){
  vec3 lilac = vec3(0.784, 0.714, 1.0);
  vec3 mint  = vec3(0.659, 0.941, 0.831);
  vec3 peach = vec3(1.0, 0.788, 0.690);
  float s = fract(a);
  vec3 c = mix(lilac, mint, smoothstep(0.0, 0.34, s));
  c = mix(c, peach, smoothstep(0.33, 0.67, s));
  return mix(c, lilac, smoothstep(0.66, 1.0, s));
}

void main(){
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float d = field(p);

  float e = 1.0;
  vec2 g = vec2(field(p + vec2(e, 0.0)) - field(p - vec2(e, 0.0)),
                field(p + vec2(0.0, e)) - field(p - vec2(0.0, e))) / (2.0*e);

  // dome height: 0 at the rim, 1 deep inside
  float depth = clamp(-d / (uR*0.85), 0.0, 1.0);
  float h = sqrt(1.0 - (1.0-depth)*(1.0-depth));
  vec3 n = normalize(vec3(g * (1.0 - h) * 2.4, 1.0));

  // refraction: pull samples inward (magnify) with a little chromatic split
  float k = uR * 0.3 * (1.0 - h*0.45);
  vec3 refr;
  refr.r = tex(p - n.xy * k * 1.00).r;
  refr.g = tex(p - n.xy * k * 1.07).g;
  refr.b = tex(p - n.xy * k * 1.15).b;

  float fres = pow(1.0 - n.z, 2.2);
  float ang = atan(n.y, n.x) / 6.28318 + uTime*0.04 + depth*0.6;
  vec3 rim = iris(ang);
  vec3 L = normalize(vec3(-0.45, -0.7, 0.9));
  float spec = pow(max(dot(n, L), 0.0), 90.0);
  float spec2 = pow(max(dot(n, normalize(vec3(0.6, 0.5, 0.8))), 0.0), 40.0) * 0.35;

  float edge = smoothstep(uR*0.07, 0.0, -d);
  float body = 0.05 + 0.1 * smoothstep(uR, -uR, p.y - uPos.y) * (1.0 - h * 0.6);
  vec3 inside = refr * 0.88 + vec3(body * 0.95, body, body * 1.15) + rim * (fres * 2.2 + edge * 0.9) + vec3(spec) * 0.95 + rim * spec2;

  vec3 outside = tex(p);
  // faint light spilled onto the black around the drop
  float halo = exp(-max(d, 0.0) / (uR*0.45));
  outside += iris(atan(g.y, g.x)/6.28318 + uTime*0.04) * halo * 0.07;

  float a = smoothstep(1.2, -1.2, d);
  gl_FragColor = vec4(mix(outside, inside, a), 1.0);
}`;

  function initGL() {
    if (!hero || !canvas || !word) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uPos = U("uPos"), uR = U("uR"), uTime = U("uTime");
    gl.uniform1i(U("uTex"), 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const paper = document.createElement("canvas");
    const ctx = paper.getContext("2d");
    let W = 0, H = 0, dpr = 1, R = 100;

    // Draw the wordmark letters exactly where the (now transparent) HTML letters sit.
    function paint() {
      fitWord();
      const hr = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = Math.max(1, Math.round(hr.width * dpr));
      H = Math.max(1, Math.round(hr.height * dpr));
      canvas.width = paper.width = W;
      canvas.height = paper.height = H;
      gl.viewport(0, 0, W, H);

      const cs = getComputedStyle(word);
      const size = parseFloat(cs.fontSize) * dpr;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#f2efea";
      ctx.font = `900 ${size}px Anybody`;
      if ("fontStretch" in ctx) ctx.fontStretch = "ultra-expanded";
      ctx.textBaseline = "alphabetic";
      for (const span of word.children) {
        const r = span.getBoundingClientRect();
        const m = ctx.measureText(span.textContent);
        const ascent = m.fontBoundingBoxAscent || size * 0.9;
        const descent = m.fontBoundingBoxDescent || size * 0.25;
        const x = (r.left - hr.left) * dpr;
        const boxH = r.height * dpr;
        const y = (r.top - hr.top) * dpr + (boxH - (ascent + descent)) / 2 + ascent;
        const sx = (r.width * dpr) / (m.width || 1); // match the HTML advance width exactly
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(sx, 1);
        ctx.fillText(span.textContent, 0, 0);
        ctx.restore();
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, paper);

      R = Math.max(60, Math.min(W, H) * (W < 700 * dpr ? 0.2 : 0.17));
      gl.uniform2f(uRes, W, H);
      gl.uniform1f(uR, R);
    }

    // drop position: rests over the wordmark, follows the pointer
    let tx = 0, ty = 0, x = 0, y = 0, idle = true, raf = 0, t0 = performance.now(), last = 0;
    function rest(t) {
      const wr = word.getBoundingClientRect(), hr = hero.getBoundingClientRect();
      const cx = (wr.left - hr.left + wr.width * 0.66) * dpr;
      const cy = (wr.top - hr.top + wr.height * 0.42) * dpr;
      return [cx + Math.sin(t * 0.35) * R * 0.9, cy + Math.cos(t * 0.27) * R * 0.25];
    }
    function draw(now) {
      const t = (now - t0) / 1000;
      if (idle) [tx, ty] = rest(t);
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      const f = 1 - Math.pow(0.0009, dt);
      x += (tx - x) * f; y += (ty - y) * f;
      gl.uniform2f(uPos, x, y);
      gl.uniform1f(uTime, reduce ? 0 : t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function loop(now) { draw(now); raf = requestAnimationFrame(loop); }

    paint();
    [x, y] = rest(0); [tx, ty] = [x, y];
    draw(performance.now());
    root.classList.add("gl-on");

    hero.addEventListener("pointermove", (e) => {
      if (reduce) return;
      const hr = hero.getBoundingClientRect();
      tx = (e.clientX - hr.left) * dpr; ty = (e.clientY - hr.top) * dpr;
      idle = false;
    });
    hero.addEventListener("pointerleave", () => { idle = true; });

    if (!reduce) {
      new IntersectionObserver(([en]) => {
        if (en.isIntersecting && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
        else if (!en.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
      }).observe(hero);
    }

    let rt = 0;
    addEventListener("resize", fitWord);
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { paint(); if (idle) [x, y] = rest((performance.now() - t0) / 1000); draw(performance.now()); }, 120); });
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; root.classList.remove("gl-on"); });
  }
  fontsReady.then(() => { fitWord(); try { initGL(); } catch (err) { root.classList.remove("gl-on"); } });

  /* ---------- project rows: glow follows the pointer ---------- */
  for (const row of document.querySelectorAll(".work__row")) {
    row.addEventListener("pointermove", (e) => {
      const r = row.getBoundingClientRect();
      row.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    });
  }

  /* ---------- current section in nav ---------- */
  const links = [...document.querySelectorAll(".nav__links a")];
  const secs = links.map((a) => document.querySelector(a.getAttribute("href")));
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        links.forEach((l) => l.removeAttribute("aria-current"));
        links[secs.indexOf(en.target)].setAttribute("aria-current", "true");
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach((s) => s && so.observe(s));
  }
})();
