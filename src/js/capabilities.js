export function initCapabilities() {
  // A small, accessible tab set keeps the published shop capabilities in one place.
  const tabs = [...document.querySelectorAll(".capability-tab")];

  function selectTab(selectedTab) {
    // Clear pointer-driven diagrams before hiding their panel.
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

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % tabs.length;
          break;
        case "ArrowLeft":
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

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
      const angle = Math.atan2(y - bounds.height / 2, x - bounds.width / 2);

      visual.style.setProperty("--pointer-x", `${(x / bounds.width) * 100}%`);
      visual.style.setProperty("--pointer-y", `${(y / bounds.height) * 100}%`);
      visual.style.setProperty("--pointer-angle", `${angle}rad`);
      visual.classList.add("is-interacting");
    });

    visual.addEventListener("pointerleave", () => visual.classList.remove("is-interacting"));
  });
}
