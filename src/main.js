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

// A small, accessible tab set keeps the published shop capabilities in one place.
const tabs = [...document.querySelectorAll(".capability-tab")];

function selectTab(selectedTab) {
  document.querySelectorAll(".process-visual").forEach((visual) => {
    visual.classList.remove("is-interacting");
  });

  tabs.forEach((tab) => {
    const selected = tab === selectedTab;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !selected;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    selectTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

// Pointer movement can guide each schematic; its CSS animation is the fallback.
document.querySelectorAll(".process-visual").forEach((visual) => {
  visual.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const bounds = visual.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    visual.style.setProperty("--pointer-x", `${(x / bounds.width) * 100}%`);
    visual.style.setProperty("--pointer-y", `${(y / bounds.height) * 100}%`);
    visual.style.setProperty("--pointer-angle", `${Math.atan2(y - bounds.height / 2, x - bounds.width / 2)}rad`);
    visual.classList.add("is-interacting");
  });

  visual.addEventListener("pointerleave", () => visual.classList.remove("is-interacting"));
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Both steel bands share one engraving cycle. Their original content remains in
// the page for assistive technology and for visitors who prefer reduced motion.
function addEngravedCycle(band, container, items) {
  if (items.length < 2) return;

  function showItem(element, item) {
    element.replaceChildren();
    if (!item.detail) {
      element.textContent = item.title;
      return;
    }

    const title = document.createElement("strong");
    const detail = document.createElement("span");
    title.textContent = item.title;
    detail.textContent = item.detail;
    element.append(title, detail);
  }

  const stage = document.createElement("div");
  const measure = document.createElement("span");
  const current = document.createElement("span");
  const next = document.createElement("span");
  stage.className = "engraved-stage";
  stage.setAttribute("aria-hidden", "true");
  measure.className = "engraved-measure";
  showItem(measure, {
    title: items.reduce((longest, item) => item.title.length > longest.length ? item.title : longest, ""),
    detail: items.reduce((longest, item) => (item.detail || "").length > longest.length ? item.detail : longest, "")
  });
  current.className = "engraved-word engraved-current";
  next.className = "engraved-word engraved-next";
  showItem(current, items[0]);
  showItem(next, items[1]);
  stage.append(measure, current, next);
  container.append(stage);
  band.classList.add("is-animated");

  let currentIndex = 0;
  next.addEventListener("animationiteration", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(current, items[currentIndex]);
    showItem(next, items[(currentIndex + 1) % items.length]);
  });
}

const industryBand = document.querySelector(".industries");
const industries = [...industryBand.querySelectorAll(".industry-list span")].map((item) => ({ title: item.textContent }));
addEngravedCycle(industryBand, industryBand.querySelector(".industries-inner"), industries);

const statsBand = document.querySelector(".stats");
const stats = [...statsBand.querySelectorAll(".stat")];
const statItems = stats.map((item) => ({
  title: item.querySelector("strong").textContent,
  detail: item.querySelector("small").textContent
}));
const statsGrid = statsBand.querySelector(".stats-grid");
const statsLabel = document.createElement("div");
statsLabel.className = "eyebrow stats-cycle-label";
statsLabel.textContent = "Company highlights";
statsLabel.setAttribute("aria-hidden", "true");
statsGrid.append(statsLabel);
addEngravedCycle(statsBand, statsGrid, statItems);

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealTargets = document.querySelectorAll(
    ".team-copy, .team-photo, .section-head, .capability-tabs, .about-copy, .industry-list, .contact-copy"
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
