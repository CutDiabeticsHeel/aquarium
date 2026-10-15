import { Temporal } from "@js-temporal/polyfill";
import {getWeekends} from "../../scripts/utils.js";
import {getSettings} from "../../scripts/utils.js";
import {updateCounter} from "../../scripts/utils.js";
import { describe } from "node:test";

const DEFAULTS = { font: "normal", images: "on", scheme: "normal" };
const d = (str) => Temporal.PlainDate.from(str);
const makeItem = (hidden) => {
    const el = document.createElement("div");
    if (hidden) el.classList.add("hidden-modal");
    return el;
};

beforeEach(() => {
    localStorage.clear();
});


describe("Тесты старницы афиши", () => {
    test("октябрь 2026", () => {
        expect(getWeekends(d("2026-10-01"), d("2026-10-31")))
            .toEqual([3, 4, 10, 11, 17, 18, 24, 25, 31]);
    });
    test("диапазон из одного дня: суббота", () => {
        expect(getWeekends(d("2026-10-03"), d("2026-10-03"))).toEqual([3]);
    });
    test("диапазон из одного дня: будний день", () => {
        expect(getWeekends(d("2026-10-05"), d("2026-10-05"))).toEqual([]);
    });
    test("конец раньше начала даёт пустой массив", () => {
        expect(getWeekends(d("2026-10-31"), d("2026-10-01"))).toEqual([]);
    });
    test("есть спектакли при фильтре", () => {
        const performances = [makeItem(true), makeItem(false)];
        const modal = document.createElement("div");

        updateCounter(performances, modal);

        expect(modal.classList.contains("hidden-modal")).toBe(true);
        expect(modal.classList.contains("zero-performances")).toBe(false);
    })
    test("нет спектакли при фильтре", () => {
        const performances = [makeItem(true), makeItem(true)];
        const modal = document.createElement("div");

        updateCounter(performances, modal);

        expect(modal.classList.contains("hidden-modal")).toBe(false);
        expect(modal.classList.contains("zero-performances")).toBe(true);
    })
    test("пустой список спектаклей при фильтре", () => {
        const modal = document.createElement("div");

        updateCounter([], modal);

        expect(modal.classList.contains("hidden-modal")).toBe(false);
        expect(modal.classList.contains("zero-performances")).toBe(true);
    })
})

describe("Тесты виджета слабовидящих", () => {
    test("пустой JSON в getSettings", () => {
        expect(getSettings())
            .toEqual(DEFAULTS);
    })
    test("битый JSON: возвращает настройки по умолчанию", () => {
        localStorage.setItem("a11y-settings", "{не json");
        expect(getSettings()).toEqual(DEFAULTS);
    });
    test("значение 'null' в хранилище: возвращает настройки по умолчанию", () => {
        localStorage.setItem("a11y-settings", "null");
        expect(getSettings()).toEqual(DEFAULTS);
    });
})


