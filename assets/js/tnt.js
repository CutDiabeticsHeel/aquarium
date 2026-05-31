
const tntSwiper = new Swiper('.tnt__swiper', {
    parallax: true,
    watchSlidesProgress: true,
    speed: 600,

    pagination: {
        el: ".swiper-pagination",
    },

    navigation: {
        prevEl: ".tnt__arrow-back",
        nextEl: ".tnt__arrow-next"
    },

    keyboard: {
        enabled: true
    },

    loop: true
})
