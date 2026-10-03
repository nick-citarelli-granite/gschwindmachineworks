export function initNavigation() {
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
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}
