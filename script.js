const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.textContent = isOpen ? "Tutup" : "Menu";
  });
}

const counters = document.querySelectorAll(".stat-number");
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.target || "0");
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));

      const tick = () => {
        current += step;
        if (current >= target) {
          entry.target.textContent = `${target}+`;
          return;
        }
        entry.target.textContent = current.toString();
        requestAnimationFrame(tick);
      };

      tick();
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));
