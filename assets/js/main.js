/* =========================================================
   Muhammad KaleemUllah Khan : site interactions
   ========================================================= */
(function () {
  "use strict";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }
  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------- Year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state + progress ---------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("is-scrolled", y > 24);
    toTop?.classList.toggle("is-visible", y > 600);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
  );

  /* ---------- Mobile menu ---------- */
  const burger = $("#navBurger");
  const navLinks = $("#navLinks");
  const closeMenu = () => {
    burger?.classList.remove("is-open");
    navLinks?.classList.remove("is-open");
    burger?.setAttribute("aria-expanded", "false");
  };
  burger?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            // small stagger for elements entering together
            setTimeout(() => e.target.classList.add("is-visible"), Math.min(i * 60, 240));
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = $$(".stat__num");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const co = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count + (c.dataset.suffix || "")));
  }

  /* ---------- Rotating hero words ---------- */
  const rotator = $("#rotator");
  if (rotator && !prefersReduced) {
    const words = [
      "trustworthy AI",
      "federated learning",
      "robust models",
      "privacy-preserving ML",
      "energy-aware systems",
    ];
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = words[wi];
      rotator.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) {
        ci++; setTimeout(type, 70);
      } else if (deleting && ci > 0) {
        ci--; setTimeout(type, 35);
      } else if (!deleting && ci === word.length) {
        deleting = true; setTimeout(type, 1600);
      } else {
        deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 280);
      }
    };
    setTimeout(type, 900);
  }

  /* ---------- Active nav link on scroll (scrollspy) ---------- */
  const sections = $$("main section[id]");
  const linkFor = (id) => $(`#navLinks a[href="#${id}"]`);
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            $$("#navLinks a").forEach((a) => a.classList.remove("is-active"));
            linkFor(e.target.id)?.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => so.observe(s));
  }

  /* ---------- Publication filtering ---------- */
  const chips = $$(".chip");
  const pubs = $$(".pub");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
      chip.classList.add("is-active");
      chip.setAttribute("aria-selected", "true");
      const f = chip.dataset.filter;
      pubs.forEach((p) => {
        const show = f === "all" || p.dataset.cat === f;
        p.classList.toggle("is-hidden", !show);
      });
    });
  });
})();
