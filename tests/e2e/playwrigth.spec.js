import { test, expect } from '@playwright/test';

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

const sliders = [
    { name: "коллективное посещение", url: "https://localhost:3000/collective-visit", swiper: ".collective-visit__swiper", next: ".collective-visit__arrow-next" },
    { name: "театральная студия",     url: "https://localhost:3000/drama-school",     swiper: ".drama-school__swiper",     next: ".drama-school__arrow-next" },
    { name: "ТНТ",                     url: "https://localhost:3000/tnt",              swiper: ".tnt__swiper",              next: ".tnt__arrow-next" },
];

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
