import { initNavigation } from "./navigation.js";
import { initCapabilities } from "./capabilities.js";
import { initEngraving } from "./engraving.js";
import { initReveals } from "./reveal.js";

// Module scripts run after the HTML is parsed, so each feature can bind directly.
initNavigation();
initCapabilities();
initEngraving();
initReveals();

document.getElementById("year").textContent = new Date().getFullYear();
