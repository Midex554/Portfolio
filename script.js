/* ══════════════════════════════════════════════════════
   MIDEX PORTFOLIO — script.js
══════════════════════════════════════════════════════ */

/* ─── Navbar: scroll shadow ─────────────────────────── */
const navbar = document.getElementById("navbar");

window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

/* ─── Mobile hamburger menu ─────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
  document.body.style.overflow = navLinks.classList.contains("open")
    ? "hidden"
    : "";
});

// Close menu on nav link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});

/* ─── Active nav link highlight ─────────────────────── */
const sections = document.querySelectorAll("section[id]");

const updateActiveLink = () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      if (!link.classList.contains("nav-cta")) {
        link.style.color = "var(--text)";
      }
    }
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });

/* ─── Scroll reveal ──────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll(".reveal");
        let delay = 0;
        siblings.forEach((el) => {
          if (!el.classList.contains("visible")) {
            el.style.transitionDelay = `${delay}ms`;
            delay += 80;
          }
        });
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);

// Add reveal class to animatable elements
const revealTargets = [
  ".project-card",
  ".skill-group",
  ".about-text",
  ".about-visual",
  ".contact-text",
  ".contact-form-wrap",
  ".section-title",
  ".section-sub",
];

revealTargets.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
});

/* ─── Contact form ───────────────────────────────────── */
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (!name || !email || !message) {
    setNote("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    setNote("Please enter a valid email address.", "error");
    return;
  }

  // Simulate send
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    setNote(`Message received, ${name}! I'll get back to you soon.`, "success");
    contactForm.reset();
    submitBtn.textContent = "Send Message";
    submitBtn.disabled = false;
  }, 1400);
});

function setNote(text, type) {
  formNote.textContent = text;
  formNote.className = `form-note ${type}`;
  setTimeout(() => {
    formNote.textContent = "";
    formNote.className = "form-note";
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Footer year ────────────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();

/* ─── Smooth scroll offset (fixed navbar) ───────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
