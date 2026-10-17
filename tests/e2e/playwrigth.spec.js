import { test, expect } from '@playwright/test';
import { exec } from 'node:child_process';

const sliders = [
    { name: "коллективное посещение", url: "https://localhost:3000/collective-visit", swiper: ".collective-visit__swiper", next: ".collective-visit__arrow-next" },
    { name: "театральная студия",     url: "https://localhost:3000/drama-school",     swiper: ".drama-school__swiper",     next: ".drama-school__arrow-next" },
    { name: "ТНТ",                     url: "https://localhost:3000/tnt",              swiper: ".tnt__swiper",              next: ".tnt__arrow-next" },
];

const viewports = [
  { name: "desktop", url: "", width: 1440, height: 900 },
  { name: "mobile", url: "",  width: 375,  height: 800 },
];

test('has title', async ({ page }) => {
  await page.goto('https://localhost:3000/');

  await expect(page).toHaveTitle("Детский театр Аквариум - Санкт-Петербург");
});

test("header видим", async ({page}) => {
  await page.goto('https://localhost:3000/');

  const header = page.locator('.main-header');

  await expect(header).toHaveCSS("opacity", "1", { timeout: 10000 })
})

test("burger menu тест", async ({page}) => {
  await page.setViewportSize({width: 375, height: 800})
  await page.goto('https://localhost:3000/')

  const burger = page.locator(".main-navigation__toggle")
  const menu = page.locator(".main-navigation")
  const linksList = page.locator(".navigation-list .navigation-list__item")
  const link = page.locator(".navigation-list__item")

  await expect(linksList).toHaveCount(8)

  await burger.click();
  await expect(menu).toContainClass("opened");
  await expect(page.locator("body")).toContainClass("disable-scroll");

  await burger.click();
  await expect(menu).toContainClass("close");

  await burger.click();
  await link.first().click();
  await expect(menu).toContainClass("close");
})

for (const {name, url, swiper, next} of sliders) {
  test(`слайдер и fancybox: ${name}`, async ({page}) => {
    await page.goto(url)

    const swiperBody = page.locator(swiper);
    const activeSlide = page.locator(`${swiper} .swiper-slide-active`);
    const indexBefore = await activeSlide.getAttribute("data-swiper-slide-index");

    await page.locator(next).click();
    await expect(activeSlide).not.toHaveAttribute("data-swiper-slide-index", indexBefore)

    await swiperBody.click();
    await expect(page.locator(".fancybox__dialog")).toBeVisible();

  })
}


for (const {name, url, width, height} of viewports){
  test(`одинаковый layout на ${name}`, async ({page}) => {
    await page.setViewportSize({width: width, height: height})
    await page.goto(`https://localhost:3000/${url}`)

    const header = page.locator('.main-header');

    await expect(page.locator(".curtainBody")).toBeHidden({ timeout: 10000 });

    await expect(header).toHaveCSS("opacity", "1", { timeout: 15000 })
    await expect(page.locator(".main-section__title .letter").last())
      .toHaveCSS("opacity", "1", { timeout: 15000 });

    await expect(page).toHaveScreenshot(`${name}-${url}.png`, {
      animations: "disabled"
    });
  })
}

test("неверный логин и пароль в админке", async ({page}) => {
  await page.goto(`https://localhost:3000/admin`)

  await page.locator(".admin__username").inputValue("пися")
  await page.locator(".admin__password").inputValue("сися")
  await page.locator(".login__button").click();

  await expect(page).toHaveURL("https://localhost:3000/admin")
})

test("проверка карты в footer", async ({page}) => {
  await page.goto(`https://localhost:3000/`)

  const map = page.locator(".theatre-location");
  const mapButton = page.locator(".map");

  await expect(map).toBeHidden();
  await mapButton.click();
  await expect(map).toBeVisible();
  await map.click({position: {x: 5, y: 5}});
  await expect(map).toBeHidden();
})

test("проверка афиши", async ({page}) => {
  await page.goto(`/playbill`)
  await expect(page.locator(".dates-list__item").first()).toBeVisible();

  const dates = await page.locator(".dates-list__item:not(.remove-filter)").all();
  const performances = await page.locator(".performances-list__item-wrapper").all();

  expect(dates.length).toBeGreaterThan(0);
  expect(performances.length).toBeGreaterThan(0);

  for (const date of dates) {
    await date.click();
    const dataAttr = await date.getAttribute("data-date")

    for (const performance of performances) {
      const dataPerAttr = await performance.getAttribute("data-date")

      if ( dataAttr === dataPerAttr) {
        await expect(performance).not.toContainClass("hidden-modal")
      } else {
        await expect(performance).toContainClass("hidden-modal")
      }
    }

    await page.locator(".remove-filter").click();

    for (const performance of performances) {
      await expect(performance).not.toContainClass("hidden-modal")
    }
  }
})

test("проверка отзывов", async ({page}) => {
  await page.goto("/reviews");

  await expect(page.locator(".topic-list__item").first()).toBeVisible();

  const topics = await page.locator(".topic-list__item").all();
  const reviews = await page.locator(".review-list__item").all();

  for (const topic of topics) {
    await topic.click();

    const dataTopic = await topic.getAttribute("data-topic");

    if (!dataTopic) { 
      for (const review of reviews) {
        await expect(review).toHaveCSS('display', 'grid')
      }
      continue
    }

    for (const review of reviews) {
      const reviewTopic = await review.getAttribute("data-topic");
      if (dataTopic === reviewTopic) {
        await expect(review).toHaveCSS('display', 'grid');
      } else {
        await expect(review).toHaveCSS('display', 'none');
      }
    }
  }
})


test("страница загружена", async ({page}) => {
  await page.goto("https://localhost:3000/");

  await expect(page.waitForLoadState("domcontentloaded"));
})