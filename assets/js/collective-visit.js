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
Fancybox.bind("[data-fancybox]", {
    
});

const h = new Hypher(Hyphenation.ru);
document.querySelectorAll('.collective-visit__title').forEach(el => {
    el.innerHTML = h.hyphenateText(el.textContent);
});