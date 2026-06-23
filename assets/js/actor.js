function initActorJs(){
    if (!document.querySelector(".actor")) return;
    const actorSwiper = new Swiper('.actor__swiper', {
        keyboard: {
            enabled: true,
        },


        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        
        navigation: {
            nextEl: '.actor__arrow-next',
            prevEl: '.actor__arrow-back',
        },

        loop: true
    });
    Fancybox.bind("[data-fancybox]", {
        
    });
};
initActorJs();
