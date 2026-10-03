export function initEngraving() {
  // Both steel bands share one engraving cycle. Their original content remains in
  // the page for assistive technology and for visitors who prefer reduced motion.
  function addEngravedCycle(band, container, items) {
    if (items.length < 2) return;

    function longestText(field) {
      return items.reduce((longest, item) => {
        const text = item[field] ?? "";
        return text.length > longest.length ? text : longest;
      }, "");
    }

    function showItem(element, item, index) {
      const sequence = document.createElement("span");
      const headline = document.createElement("span");
      const title = document.createElement("strong");
      const detail = document.createElement("span");

      const number = String(index + 1).padStart(2, "0");
      const total = String(items.length).padStart(2, "0");
      const position = `${number} / ${total}`;
      sequence.className = "engraved-sequence";
      sequence.textContent = item.label ? `${position} · ${item.label}` : position;
      headline.className = "engraved-headline";
      title.textContent = item.title;

      if (item.icon) {
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        icon.setAttribute("class", "icon");
        icon.setAttribute("aria-hidden", "true");
        use.setAttribute("href", `assets/icons.svg#${item.icon}`);
        icon.append(use);
        headline.append(icon);
      }

      headline.append(title);
      detail.className = "engraved-detail";
      detail.textContent = item.detail;
      element.replaceChildren(sequence, headline, detail);
    }

    const stage = document.createElement("div");
    const measure = document.createElement("span");
    const current = document.createElement("span");
    const next = document.createElement("span");

    stage.className = "engraved-stage";
    stage.setAttribute("aria-hidden", "true");
    measure.className = "engraved-measure";

    // Reserve room for the longest copy so the steel band does not jump in width.
    showItem(measure, {
      title: longestText("title"),
      detail: longestText("detail"),
      label: longestText("label"),
      icon: items[0].icon
    }, 0);

    current.className = "engraved-word engraved-current";
    next.className = "engraved-word engraved-next";
    showItem(current, items[0], 0);
    showItem(next, items[1], 1);
    stage.append(measure, current, next);
    container.append(stage);
    band.classList.add("is-animated");

    let currentIndex = 0;
    // Update the off-screen words at the cycle boundary for a single pass.
    next.addEventListener("animationiteration", () => {
      currentIndex = (currentIndex + 1) % items.length;
      const nextIndex = (currentIndex + 1) % items.length;

      showItem(current, items[currentIndex], currentIndex);
      showItem(next, items[nextIndex], nextIndex);
    });
  }

  const industryBand = document.querySelector(".industries");
  const industries = [...industryBand.querySelectorAll(".industry-item")].map((item) => ({
    title: item.querySelector("strong").textContent,
    detail: item.querySelector("small").textContent,
    icon: item.dataset.icon
  }));
  addEngravedCycle(industryBand, industryBand.querySelector(".industries-inner"), industries);

  const statsBand = document.querySelector(".stats");
  const stats = [...statsBand.querySelectorAll(".stat")];
  const statItems = stats.map((item) => ({
    title: item.querySelector("strong").textContent,
    label: item.querySelector("span").textContent,
    detail: item.querySelector("small").textContent,
    icon: item.dataset.icon
  }));
  const statsGrid = statsBand.querySelector(".stats-grid");
  const statsLabel = document.createElement("div");
  statsLabel.className = "eyebrow stats-cycle-label";
  statsLabel.textContent = "Company highlights";
  statsLabel.setAttribute("aria-hidden", "true");
  statsGrid.append(statsLabel);
  addEngravedCycle(statsBand, statsGrid, statItems);
}
