import { initNavigation } from "./navigation.js";
import { initCapabilities } from "./capabilities.js";
import { initEngraving } from "./engraving.js";
import { initReveals } from "./reveal.js";

initNavigation();
initCapabilities();
initEngraving();
initReveals();

document.getElementById("year").textContent = new Date().getFullYear();
