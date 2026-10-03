export function initCapabilities() {
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
}
