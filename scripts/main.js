import '../assets/js/menu.js';
import '../assets/js/footer.js';
import '../assets/js/curtains.js';
import '../assets/js/visually-impared.js';

const pages = [
    [".actor", () => import("../assets/js/actor.js")],
    [".reform__wrapper", () => import("../assets/js/admin-panel.js")],
    [".collective-visit__section", () => import("../assets/js/collective-visit.js")],
    [".drama-school-section", () => import("../assets/js/drama-school.js")],
    [".performance", () => import("../assets/js/performance.js")],
    [".playbill", () => import("../assets/js/playbill.js")],
    [".reviews", () => import("../assets/js/reviews.js")],
    [".tnt__section", () => import("../assets/js/tnt.js")],
    [".troupe-section", () => import("../assets/js/troupe.js")],
    [".welcome", () => import("../assets/js/welcome.js")],
]

for (const [selector, load] of pages) {
    if (document.querySelector(selector)) load();
}