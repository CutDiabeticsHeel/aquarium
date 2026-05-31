const mainSectionSwiper = new Swiper('.main-section-swiper', {
    

    keyboard: {
        enabled: true,
    },


    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    
    navigation: {
        nextEl: '.main-section__arrow-next',
        prevEl: '.main-section__arrow-back',
    },

    loop: true
});

const aboutTheatreSwiper = new Swiper('.about-theatre__swiper', {
    
    effect: 'cards',
    cardsEffect: {
        perSlideOffset: 10,
        perSlideRotate: 2, 
        slideShadows: false, 
    },
    pagination: {
        el: '.swiper-pagination'
    },
    navigation: {
        nextEl: '.about-theatre__arrow-next',
        prevEl: '.about-theatre__arrow-back'
    }
})

const elements = document.querySelectorAll('.accordion-wrapper');

Array.from(elements).forEach(function(el){
	const btn = el.querySelector('.about-theatre__learn-more');
	const content = el.querySelector('.about-theatre__text');

	btn.addEventListener('click', function(){
		if(!content.classList.contains('open')){
			content.style.maxHeight = content.scrollHeight + 'px';
			content.classList.add('open');
			btn.textContent = 'Свернуть';
		} else {
			content.style.maxHeight = '300px';
			content.classList.remove('open');
			btn.textContent = 'Узнать больше';
		}
	});
});