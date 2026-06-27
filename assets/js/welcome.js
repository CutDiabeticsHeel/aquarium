function initWelcomeJs(){
    if (!document.querySelector(".welcome")) return;
    const mainSectionSwiper = new Swiper('.main-section-swiper', {    

        keyboard: {
            enabled: true,
        },

        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        
        autoplay: {
            delay: 3500
        },

        loop: true
    });

    const observer = new IntersectionObserver((entries) =>{
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mainSectionSwiper.autoplay.start()
            } else {
                mainSectionSwiper.autoplay.stop()
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(document.querySelector('.main-section-swiper'));

    const button = document.querySelector('.about-theatre__learn-more');

    const pulseTl = gsap.timeline({
        paused: true,
        repeat: -1,
        defaults: {
            duration: 0.5,
            ease: "sine.inOut"
        }
    });

    pulseTl
        .to(button, { scale: 1.1 })
        .to(button, { scale: 0.9 })
        .to(button, { scale: 1.1 })
        .to(button, { scale: 1.0 })

    button.addEventListener('mouseenter', () => {
        pulseTl.play();
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(pulseTl, {
            timeScale: 0,
            duration: 0.5,
            onComplete: () => {
                pulseTl.pause();
                pulseTl.timeScale(1); 

                gsap.to(button, {
                    scale: 1,
                    duration: 0.5,
                    ease: "sine.inOut"
                });
            }
        });
    });


    const aboutTheatreSwiper = new Swiper('.about-theatre__swiper', {
        
        effect: 'cards',
        cardsEffect: {
            perSlideOffset: 10,
            perSlideRotate: 2, 
            slideShadows: false, 
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.about-theatre__arrow-next',
            prevEl: '.about-theatre__arrow-back'
        }
    })

    gsap.registerPlugin(ScrollTrigger)
    let aboutTrigger;

    function createScrollTrigger() {
        
        if (window.innerWidth <= 1301) return;
        aboutTrigger = ScrollTrigger.create({
            trigger: ".about-theatre",
            start: `top top`,
            end: () => "+=" + Math.max(calculateDynamicHeight() - 397, 0),
            pin: ".about-theatre__swiper",
            pinSpacing: false,
            invalidateOnRefresh: true,
            anticipatePin: 1
        });
    }
    function calculateDynamicHeight() {
        const openContent = document.querySelector('.about-theatre__text.open');
        return openContent ? openContent.scrollHeight : 300; 
    }


    document.querySelectorAll('.accordion-wrapper').forEach(function(el){
        const btn = el.querySelector('.about-theatre__learn-more');
        const content = el.querySelector('.about-theatre__text');
        const AboutTheatreSwiper = document.querySelector('.about-theatre__swiper');

        btn.addEventListener('click', function(){
            if(!content.classList.contains('open')){
                content.style.maxHeight = content.scrollHeight + 'px';
                btn.textContent = 'Свернуть';
                content.classList.add('open');
                setTimeout(() => {
                    if (aboutTrigger) { aboutTrigger.kill(); aboutTrigger = null; }
                    createScrollTrigger();
                    ScrollTrigger.refresh();
                }, 1000);
            } else {
                content.style.maxHeight = '200px';
                btn.textContent = 'Узнать больше';
                content.classList.remove('open');
                if (window.innerWidth > 1301) {
                    const currentY = AboutTheatreSwiper.getBoundingClientRect().top - 
                            AboutTheatreSwiper.parentElement.getBoundingClientRect().top;
                    if (aboutTrigger) {
                        aboutTrigger.kill();
                        aboutTrigger = null;
                    }
                    gsap.set(AboutTheatreSwiper, { y: currentY });
                    gsap.to(AboutTheatreSwiper, {
                        y: 0,
                        duration: 0.9,
                        ease: "power2.inOut",     
                    });
                }
            }
        });
    });

    const title = document.querySelector(".main-section__title");
    const link = document.querySelector(".main-section__link")

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
        ease: "power4.out",
    });

    tl.fromTo(
        letters,
        {
            y: -120,
            rotateX: -180,
            opacity: 0,
            filter: "blur(15px)",
            delay: 2.5
        },
        {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.04,
            ease: "expo.out",
            delay: 2.5
        },
        "-=0.8"
    );

    tl.fromTo(
        link,
        {
            filter: "blur(100px)"
        },
        {
            filter: "blur(0px)",
            ease: "expo.out",
            duration: 1.2,
        },
        "<"
    )


    const header = document.querySelector(".main-header")

    gsap.set(header, {
        opacity: 0,
        position: "absolute",
        "background-color": "none",
    });

    window.addEventListener("load", () => {
        gsap.to(header, {
            opacity: 1,
            duration: 1,
            delay: 2,
            ease: "power2.out",
        });
    });

    Fancybox.bind("[data-fancybox]", {
        
    });
};
initWelcomeJs();
