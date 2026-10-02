const header = document.querySelector("header");
const menuButton = document.querySelector(".menu");
const navigation = document.getElementById("nav");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("open", open);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) setMenuOpen(false);
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealTargets = document.querySelectorAll(
    ".section-head, .card, .about-image, .about-grid > div:last-child, .industry-list, .contact-grid > div"
  );
  revealTargets.forEach((element) => element.setAttribute("data-reveal", ""));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

  document.documentElement.classList.add("js-motion");
  revealTargets.forEach((element) => observer.observe(element));
}
