/* ========================================
   Global Constants
======================================== */
const EMAILJS_PUBLIC_KEY = "FYzqipcP-lMKdxZUV";
const THEME_KEY = "marvstech-theme";

/* ========================================
   Utilities
======================================== */
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme, persist = true) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    localStorage.setItem(THEME_KEY, theme);
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

/* ========================================
   Global Init
======================================== */
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initHeader();
  initReveal();
  initWordSwap();
  initParticles();
  initPortfolioFilter();
  initContactForm();
  initScrollIndicator();
  initServiceSpy();
  initFaqAccordion();
});

/* ========================================
   Theme Toggle
======================================== */
function initThemeToggle() {
  const toggles = qsa("[data-theme-toggle]");
  if (!toggles.length) return;

  const syncLabels = () => {
    const theme = getTheme();
    toggles.forEach((toggle) => {
      toggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      );
    });
  };

  syncLabels();

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      applyTheme(getTheme() === "light" ? "dark" : "light");
      syncLabels();
    });
  });

  window.addEventListener("themechange", syncLabels);
}

/* ========================================
   Header / Mobile Drawer
======================================== */
function initHeader() {
  const header = qs(".site-header");
  const menuToggle = qs(".menu-toggle");
  const drawer = qs(".mobile-drawer");
  const drawerLinks = qsa(".mobile-nav-link", drawer || document);

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 60);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  if (!menuToggle || !drawer) return;

  const closeDrawer = () => {
    menuToggle.classList.remove("active");
    drawer.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) {
      closeDrawer();
    }
  });

  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });
}

/* ========================================
   Scroll Reveal
======================================== */
function initReveal() {
  const revealTargets = qsa("[data-reveal]");
  if (!revealTargets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((element) => observer.observe(element));
}

/* ========================================
   Hero Word Swap
======================================== */
function initWordSwap() {
  const target = qs("[data-word-swap]");
  if (!target) return;

  const words = ["your website.", "your app.", "your brand.", "your presence."];
  let index = 0;

  window.setInterval(() => {
    target.classList.add("fade-out");
    window.setTimeout(() => {
      index = (index + 1) % words.length;
      target.textContent = words[index];
      target.classList.remove("fade-out");
    }, 500);
  }, 2800);
}

/* ========================================
   Home Particle Canvas
======================================== */
function initParticles() {
  const canvas = qs("[data-particle-canvas]");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const particles = [];
  const total = 70;
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  let palette = {
    primary: "rgba(242, 57, 128, 0.32)",
    secondary: "rgba(255, 255, 255, 0.28)",
    link: "rgba(242, 57, 128, 0.15)"
  };

  const readPalette = () => {
    const styles = getComputedStyle(document.documentElement);
    palette = {
      primary: styles.getPropertyValue("--particle-primary").trim(),
      secondary: styles.getPropertyValue("--particle-secondary").trim(),
      link: styles.getPropertyValue("--particle-link").trim()
    };
  };

  function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    particles.length = 0;
    readPalette();

    for (let i = 0; i < total; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 1.5 + Math.random(),
        color: i % 2 === 0 ? palette.primary : palette.secondary
      });
    }
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x <= 0 || particle.x >= width) {
        particle.vx *= -1;
      }

      if (particle.y <= 0 || particle.y >= height) {
        particle.vy *= -1;
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = particle.color;
      context.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const neighbor = particles[next];
        const dx = particle.x - neighbor.x;
        const dy = particle.y - neighbor.y;
        const distance = Math.sqrt((dx * dx) + (dy * dy));

        if (distance <= 130) {
          const opacity = 1 - (distance / 130);
          const linkColor = palette.link.replace(/[\d.]+\)\s*$/, `${(opacity * 0.15).toFixed(3)})`);
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.strokeStyle = linkColor;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    });

    animationFrame = window.requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(animationFrame);
    resizeCanvas();
    draw();
  });

  window.addEventListener("themechange", () => {
    window.cancelAnimationFrame(animationFrame);
    resizeCanvas();
    draw();
  });
}

/* ========================================
   Scroll Indicator
======================================== */
function initScrollIndicator() {
  const indicator = qs(".scroll-indicator");
  if (!indicator) return;

  const toggleIndicator = () => {
    indicator.classList.toggle("hidden", window.scrollY > 40);
  };

  toggleIndicator();
  window.addEventListener("scroll", toggleIndicator, { passive: true });
}

/* ========================================
   Portfolio Filter
======================================== */
function initPortfolioFilter() {
  const filterButtons = qsa("[data-filter-button]");
  const projectCards = qsa("[data-project-card]");
  const emptyState = qs("[data-filter-empty]");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter || "all";

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        card.classList.add("filter-hidden");
      });

      window.setTimeout(() => {
        let visibleCount = 0;

        projectCards.forEach((card) => {
          const matches = category === "all" || card.dataset.category === category;
          card.classList.toggle("is-hidden", !matches);
          if (matches) {
            visibleCount += 1;
          }
        });

        if (emptyState) {
          emptyState.classList.toggle("show", visibleCount === 0);
        }

        window.requestAnimationFrame(() => {
          projectCards.forEach((card) => {
            if (!card.classList.contains("is-hidden")) {
              card.classList.remove("filter-hidden");
            }
          });
        });
      }, 180);
    });
  });
}

/* ========================================
   Sticky Service Navigation
======================================== */
function initServiceSpy() {
  const pills = qsa("[data-service-pill]");
  const sections = qsa("[data-service-section]");

  if (!pills.length || !sections.length) return;

  const setActive = (id) => {
    pills.forEach((pill) => {
      pill.classList.toggle("active", pill.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries.find((entry) => entry.isIntersecting);
    if (visibleEntry) {
      setActive(visibleEntry.target.id);
    }
  }, {
    rootMargin: "-30% 0px -55% 0px",
    threshold: 0.15
  });

  sections.forEach((section) => observer.observe(section));
}

/* ========================================
   FAQ Accordion
======================================== */
function initFaqAccordion() {
  const questions = qsa("[data-faq-question]");
  if (!questions.length) return;

  questions.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      if (!answer) return;

      const isOpen = button.getAttribute("aria-expanded") === "true";

      questions.forEach((item) => {
        item.setAttribute("aria-expanded", "false");
        const sibling = item.nextElementSibling;
        if (sibling) {
          sibling.style.maxHeight = "0px";
        }
      });

      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

/* ========================================
   Contact Form / EmailJS
======================================== */
function initContactForm() {
  const form = qs("[data-contact-form]");
  if (!form) return;

  const successCard = qs(".form-success");
  const errorCard = qs(".form-failure");
  const serviceId = form.dataset.serviceId || "[PASTE_SERVICE_ID_HERE]";
  const templateId = form.dataset.templateId || "[PASTE_TEMPLATE_ID_HERE]";
  const fields = qsa("[data-required]", form);

  if (window.emailjs && typeof window.emailjs.init === "function" && EMAILJS_PUBLIC_KEY !== "[PASTE_PUBLIC_KEY_HERE]") {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const setError = (field, message) => {
    const row = field.closest(".field-row");
    if (!row) return;
    row.classList.add("has-error");
    const error = qs(".field-error", row);
    if (error) {
      error.textContent = message;
    }
  };

  const clearError = (field) => {
    const row = field.closest(".field-row");
    if (!row) return;
    row.classList.remove("has-error");
    const error = qs(".field-error", row);
    if (error) {
      error.textContent = "";
    }
  };

  const validateField = (field) => {
    const value = field.value.trim();

    if (!value) {
      setError(field, "This field is required.");
      return false;
    }

    if (field.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setError(field, "Enter a valid email address.");
        return false;
      }
    }

    if (field.tagName === "SELECT" && value.startsWith("—")) {
      setError(field, "Please make a selection.");
      return false;
    }

    clearError(field);
    return true;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    const fullName = qs("#full-name", form)?.value.trim() || "";
    const email = qs("#email-address", form)?.value.trim() || "";
    const business = qs("#business-name", form)?.value.trim() || "";
    const service = qs("#service-needed", form)?.value.trim() || "";
    const budget = qs("#budget-range", form)?.value.trim() || "";
    const messageText = qs("#message", form)?.value.trim() || "";

    const whatsappMessage = encodeURIComponent(
      `Hello MarvsTech, my name is ${fullName} from ${business}. I'm interested in ${service}. Message: ${messageText}`
    );

    window.open(`https://wa.me/2348034953157?text=${whatsappMessage}`, "_blank", "noopener");

    const templateParams = {
      name: fullName,
      email,
      title: "New Project Inquiry – MarvsTech",
      message:
        `Business Name: ${business}\n` +
        `Service Needed: ${service}\n` +
        `Budget Range: ${budget}\n\n` +
        `Message:\n${messageText}`
    };

    const placeholdersPresent =
      EMAILJS_PUBLIC_KEY === "[PASTE_PUBLIC_KEY_HERE]" ||
      serviceId === "[PASTE_SERVICE_ID_HERE]" ||
      templateId === "[PASTE_TEMPLATE_ID_HERE]";

    if (!window.emailjs || placeholdersPresent) {
      if (errorCard) {
        errorCard.classList.add("show");
        errorCard.innerHTML =
          `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">` +
          `<path d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
          `</svg>` +
          `<div><strong class="text-white">Something went wrong.</strong><p>Please reach out to us directly on <a class="text-pink" href="https://wa.me/2348034953157" target="_blank" rel="noreferrer">WhatsApp</a>.</p></div>`;
      }
      return;
    }

    try {
      await window.emailjs.send(serviceId, templateId, templateParams);

      form.style.display = "none";
      if (errorCard) {
        errorCard.classList.remove("show");
      }
      if (successCard) {
        successCard.classList.add("show");
      }
    } catch (error) {
      if (errorCard) {
        errorCard.classList.add("show");
        errorCard.innerHTML =
          `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">` +
          `<path d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
          `</svg>` +
          `<div><strong class="text-white">Something went wrong.</strong><p>Please reach out to us directly on <a class="text-pink" href="https://wa.me/2348034953157" target="_blank" rel="noreferrer">WhatsApp</a>.</p></div>`;
      }
    }
  });
}
