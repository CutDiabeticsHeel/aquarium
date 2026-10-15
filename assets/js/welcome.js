import Swiper from "./swiper-init.js";
import { Fancybox } from "@fancyapps/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function initWelcomeJs() {
  gsap.registerPlugin(ScrollTrigger);
  if (!document.querySelector(".welcome")) return;

  const mainSectionSwiper = new Swiper(".main-section-swiper", {
    keyboard: {
      enabled: true,
    },

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },

    autoplay: {
      delay: 3500,
    },

    loop: true,
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mainSectionSwiper.autoplay.start();
        } else {
          mainSectionSwiper.autoplay.stop();
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  observer.observe(document.querySelector(".main-section-swiper"));

  const button = document.querySelector(".about-theatre__learn-more");

  gsap.set(button, { scale: 1.1 });

  const pulseTl = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
    defaults: {
      duration: 0.5,
      ease: "sine.inOut",
    },
  });

  pulseTl.to(button, { scale: 0.9 });

  const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hasHover) {
    button.addEventListener("mouseenter", () => {
      pulseTl.play();
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(pulseTl, {
        timeScale: 0,
        duration: 0.5,
        onComplete: () => {
          pulseTl.pause();
          pulseTl.timeScale(1);
          gsap.to(button, {
            scale: 1,
            duration: 0.5,
            ease: "sine.inOut",
          });
        },
      });
    });
  }

  const aboutTheatreSwiper = new Swiper(".about-theatre__swiper", {
    effect: "cards",
    cardsEffect: {
      perSlideOffset: 10,
      perSlideRotate: 2,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".about-theatre__arrow-next",
      prevEl: ".about-theatre__arrow-back",
    },
  });

  let aboutTrigger;

  function createScrollTrigger() {
    if (window.matchMedia("(width <= 1301px)").matches) return;
    aboutTrigger = ScrollTrigger.create({
      trigger: ".about-theatre",
      start: `top top`,
      end: () => "+=" + Math.max(calculateDynamicHeight() - 397, 0),
      pin: ".about-theatre__swiper",
      pinSpacing: false,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    });
  }
  function calculateDynamicHeight() {
    const openContent = document.querySelector(".about-theatre__text.open");
    return openContent ? openContent.scrollHeight : 300;
  }

  document.querySelectorAll(".accordion-wrapper").forEach(function (element) {
    const button = element.querySelector(".about-theatre__learn-more");
    const content = element.querySelector(".about-theatre__text");
    const aboutTheatreSwiper = document.querySelector(".about-theatre__swiper");

    button.addEventListener("click", function () {
      if (!content.classList.contains("open")) {
        gsap.set(content, { maxHeight: `${content.scrollHeight}px` });
        button.textContent = "Свернуть";
        content.classList.add("open");
        setTimeout(() => {
          if (aboutTrigger) {
            aboutTrigger.kill();
            aboutTrigger = null;
          }
          createScrollTrigger();
          ScrollTrigger.refresh();
        }, 1000);
      } else {
        gsap.set(content, { maxHeight: "200px" });
        button.textContent = "Узнать больше";
        content.classList.remove("open");
        if (window.matchMedia("(width > 1301px)").matches) {
          const currentY =
            aboutTheatreSwiper.getBoundingClientRect().top -
            aboutTheatreSwiper.parentElement.getBoundingClientRect().top;
          if (aboutTrigger) {
            aboutTrigger.kill();
            aboutTrigger = null;
          }
          gsap.set(aboutTheatreSwiper, { y: currentY });
          gsap.to(aboutTheatreSwiper, {
            y: 0,
            duration: 0.9,
            ease: "power2.inOut",
          });
        }
      }
    });
  });

  const title = document.querySelector(".main-section__title");
  const link = document.querySelector(".main-section__link");

  const lines = title.innerHTML.split("<br>");
  title.innerHTML = lines
    .map((line) => {
      return `
                <span class="line">
                    ${line
                      .trim()
                      .split("")
                      .map((char) =>
                        char === " "
                          ? "<span>&nbsp;</span>"
                          : `<span class="letter">${char}</span>`,
                      )
                      .join("")}
                </span>
            `;
    })
    .join("");

  const letters = title.querySelectorAll(".letter");

  const tl = gsap.timeline();

  tl.set(title, {
    clipPath: "inset(0 100% 0 0)",
  });

  tl.to(title, {
    clipPath: "inset(0 0% 0 0)",
    duration: 1.2,
    ease: "power4.out",
  });

  tl.fromTo(
    letters,
    {
      y: -120,
      rotateX: -180,
      opacity: 0,
      filter: "blur(15px)",
      delay: 2.5,
    },
    {
      y: 0,
      rotateX: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.04,
      ease: "expo.out",
      delay: 2.5,
    },
    "-=0.8",
  );

  tl.fromTo(
    link,
    {
      filter: "blur(100px)",
    },
    {
      filter: "blur(0px)",
      ease: "expo.out",
      duration: 1.2,
    },
    "<",
  );

  const header = document.querySelector(".main-header");

  gsap.set(header, {
    opacity: 0,
    position: "absolute",
    "background-color": "none",
  });

  const showHeader = () => {
    gsap.to(header, {
      opacity: 1,
      duration: 1,
      delay: 2,
      ease: "power2.out",
    });
  };

  if (document.readyState === "complete") {
    showHeader();
  } else {
    window.addEventListener("load", showHeader, { once: true });
  }

  Fancybox.bind("[data-fancybox]", {});
}
initWelcomeJs();
