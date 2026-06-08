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

const title = document.querySelector(".main-section__title");

const lines = title.innerHTML.split("<br>");

title.innerHTML = lines
    .map(line => {
        return `
            <span class="line">
                ${line.trim()
                    .split("")
                    .map(char =>
                        char === " "
                            ? "<span>&nbsp;</span>"
                            : `<span class="letter">${char}</span>`
                    )
                    .join("")}
            </span>
        `;
    })
    .join("");
    
const letters = title.querySelectorAll(".letter");

const tl = gsap.timeline();

tl.set(title, {
    clipPath: "inset(0 100% 0 0)"
});

tl.to(title, {
    clipPath: "inset(0 0% 0 0)",
    duration: 1.2,
    ease: "power4.out"
});

tl.fromTo(
    letters,
    {
        y: -120,
        rotateX: -180,
        opacity: 0,
        filter: "blur(15px)"
    },
    {
        y: 0,
        rotateX: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.04,
        ease: "expo.out"
    },
    "-=0.8"
);


const header = document.querySelector(".main-header")
const mainSection = document.querySelector(".main-section")

gsap.set(header, {
    height: 0,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: "hidden"
});

window.addEventListener("load", () => {
    gsap.to(header, {
        height: 126,
        paddingTop: 15,
        paddingBottom: 15,
        opacity: 1,
        duration: 1,
        delay: 2,
        ease: "power2.out",
        clearProps: "all"
    });
    gsap.to(mainSection, {
        height: "85vh",
        delay: 2
    })
});