import { Temporal } from "@js-temporal/polyfill";

export function getWeekends(startDate, endDate) {
    const weekends = [];
    let currentDate = startDate;

    while (Temporal.PlainDate.compare(currentDate, endDate) <= 0) {
      const dayOfWeek = currentDate.dayOfWeek;
      if (dayOfWeek == 6 || dayOfWeek == 7) {
        weekends.push(currentDate.day);
      }
      currentDate = currentDate.add({ days: 1 });
    }
    return weekends;
}


export function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultSettings();
    } catch {
      return defaultSettings();
    }
  }

function defaultSettings() {
  return { font: "normal", images: "on", scheme: "normal" };
}

export function updateCounter(performancesItem, modal, fadeIn = () => {}) {
    let visiblePerformance = 0;
    for (let performance of performancesItem) {
      if (!performance.classList.contains("hidden-modal")) {
        visiblePerformance++;
      }
    }
    modal.classList.toggle("hidden-modal", visiblePerformance !== 0);
    modal.classList.toggle("zero-performances", visiblePerformance === 0);
    fadeIn(modal);
}