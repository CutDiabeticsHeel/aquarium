
const collectiveVisitSwiper = new Swiper('.collective-visit__swiper', {
    keyboard: {
        enabled: true,
        onlyInViewport: false,
        pageUpDown: true
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    
    navigation: {
        nextEl: '.collective-visit__arrow-next',
        prevEl: '.collective-visit__arrow-back',
    },

    loop: true
})