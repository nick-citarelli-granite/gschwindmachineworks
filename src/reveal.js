export function initReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
}
