const dramaSchoolSwiper = new Swiper('.drama-school__swiper', {

    keyboard: {
        enabled: true,
    },


    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    
    navigation: {
        nextEl: '.drama-school__arrow-next',
        prevEl: '.drama-school__arrow-back',
    },

    loop: true
});