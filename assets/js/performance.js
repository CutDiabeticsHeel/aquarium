
const performanceSwiper = new Swiper('.performance__swiper', {


    keyboard: {
        enabled: true,
    },


    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    
    navigation: {
        nextEl: '.performance__arrow-next',
        prevEl: '.performance__arrow-back',
    },

    loop: true
});
Fancybox.bind("[data-fancybox]", {
    
});