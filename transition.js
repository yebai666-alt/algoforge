// Standalone particle page transition - works without React
(function () {
  const COLORS = [
    "rgba(34,211,238,0.8)",
    "rgba(59,130,246,0.7)",
    "rgba(34,211,238,0.5)",
    "rgba(96,165,250,0.6)",
    "rgba(147,197,253,0.5)",
    "rgba(255,255,255,0.3)",
  ];

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle(container, cx, cy) {
    const el = document.createElement("div");
    const size = randomBetween(2, 6);
    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(40, 200);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const startX = cx + randomBetween(-80, 80);
    const startY = cy + randomBetween(-80, 80);

    Object.assign(el.style, {
      position: "absolute",
      left: startX + "px",
      top: startY + "px",
      width: size + "px",
      height: size + "px",
      borderRadius: "50%",
      background: color,
      boxShadow: "0 0 " + size * 3 + "px " + color,
      pointerEvents: "none",
      opacity: "0",
      transform: "scale(0)",
      transition: "none",
    });

    container.appendChild(el);

    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    const delay = randomBetween(0, 200);
    const duration = randomBetween(500, 900);

    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.transition =
          "all " + duration + "ms cubic-bezier(0.25,0.46,0.45,0.94)";
        el.style.left = endX + "px";
        el.style.top = endY + "px";
        el.style.opacity = "1";
        el.style.transform = "scale(1.5)";

        setTimeout(() => {
          el.style.opacity = "0";
          el.style.transform = "scale(0)";
        }, duration * 0.6);
      }, delay);
    });
  }

  function runTransition(href) {
    // Create overlay
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "999999",
      pointerEvents: "auto",
      overflow: "hidden",
    });

    // Dark backdrop
    const backdrop = document.createElement("div");
    Object.assign(backdrop.style, {
      position: "absolute",
      inset: "0",
      background: "#000",
      opacity: "0",
      transition: "opacity 0.3s ease",
    });
    overlay.appendChild(backdrop);

    // Center glow
    const glow = document.createElement("div");
    Object.assign(glow.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%) scale(0)",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
      transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
      opacity: "0",
    });
    overlay.appendChild(glow);

    // Loading text
    const textWrap = document.createElement("div");
    Object.assign(textWrap.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      textAlign: "center",
      opacity: "0",
      transition: "opacity 0.3s ease 0.15s",
    });
    const label = document.createElement("span");
    Object.assign(label.style, {
      fontFamily: "monospace",
      fontSize: "11px",
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      color: "rgba(34,211,238,0.8)",
    });
    label.textContent = "LOADING";
    const bar = document.createElement("div");
    Object.assign(bar.style, {
      marginTop: "12px",
      height: "2px",
      width: "0",
      margin: "12px auto 0",
      background:
        "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)",
      transition: "width 0.5s ease 0.2s",
    });
    textWrap.appendChild(label);
    textWrap.appendChild(bar);
    overlay.appendChild(textWrap);

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
      backdrop.style.opacity = "1";
      glow.style.transform = "translate(-50%,-50%) scale(3)";
      glow.style.opacity = "1";
      textWrap.style.opacity = "1";
      bar.style.width = "120px";

      // Spawn particles
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      for (let i = 0; i < 60; i++) {
        createParticle(overlay, cx, cy);
      }

      // Navigate after animation
      setTimeout(() => {
        window.location.href = href;
      }, 700);
    });
  }

  // Expose globally
  window.navigateWithTransition = runTransition;

  // Auto-bind all [data-transition] links
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-transition]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        runTransition(el.getAttribute("data-transition") || el.href);
      });
    });
  });
})();
