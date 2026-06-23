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
    
});const collectiveVisitSwiper = new Swiper('.collective-visit__swiper', {
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
    
});const curtains = document.querySelectorAll(".curtainContainer");
const overlay = document.querySelector(".overlay")
const curtainsContainer = document.querySelector(".curtainBody")

function openCurtains() {
    gsap.to(curtains[0], {
            x: "-150vw",
            duration: 1.5,
            ease: "power3.inOut",
                onComplete: () => {
            gsap.set(curtainsContainer, { 
                zIndex: -1,
                visibility: "hidden"
            });
        }

    })
    gsap.to(curtains[1], {
            x: "150vw",
            duration: 1.5,
            ease: "power3.inOut"

    })
    gsap.to(overlay, {
            opacity: 0,
            duration: 1.5,

    })
}

function closeCurtains() {
    gsap.set(curtainsContainer, { 
        zIndex: 1111,
        visibility: "visible"
    })
    gsap.to(curtains[0], {
            x: "-5vw",
            duration: 1.5,
            ease: "power3.inOut"

    })
    gsap.to(curtains[1], {
            x: "15vw",
            duration: 1.5,
            ease: "power3.inOut"

    })
    gsap.to(overlay, {
            opacity: 1,
            duration: 1.5,

    })
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {

        if (e.target.closest('button')) return;
        if (link.dataset.fancybox !== undefined) return;
        if (link.href === window.location.href) {
            return;
        }
        if (link.hash && link.pathname === location.pathname) {
            return;
        }

        e.preventDefault();
        const href = link.href;
        closeCurtains();
        setTimeout(() => {
            window.location.href = href;
        }, 1600)
    });
});

window.addEventListener('pageshow', () => {
    const currentPath = window.location.pathname;
    document.querySelectorAll(".under-line-link").forEach(link =>{
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath && !link.hash) {
            link.classList.add('active-link');
        }
    })
    // if (event.persisted) {
    //     openCurtains();
    // }
    openCurtains();
});const dramaSchoolSwiper = new Swiper('.drama-school__swiper', {

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
Fancybox.bind("[data-fancybox]", {
    
});const mapButton = document.querySelector(".map")
const map = document.querySelector(".theatre-location")
const closeModal = document.querySelector(".close-modal")

mapButton.addEventListener("click", () => {
    map.classList.toggle("hidden-modal")
    document.body.classList.add("disable-scroll");
})

map.addEventListener("click", function (event){
    if (event.target === this){
        map.classList.add("hidden-modal")
        document.body.classList.remove("disable-scroll");
    }
})

closeModal.addEventListener("click", () => {
    map.classList.add("hidden-modal") 
    document.body.classList.remove("disable-scroll");
})const toggle = document.querySelector(".main-navigation__toggle")
const navigationMenu = document.querySelector(".main-navigation")

toggle.addEventListener("click", ()=>{
    navigationMenu.classList.toggle("close")
    navigationMenu.classList.toggle("opened")
    document.body.classList.toggle("disable-scroll");
})
document.querySelectorAll('.navigation-list .under-line-link').forEach(link => {
    link.addEventListener('click', () => {
        
        navigationMenu.classList.remove('opened');
        navigationMenu.classList.add('close');
        document.body.classList.remove('disable-scroll');
    });
});
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
const monthMap = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
const date = Temporal.Now.plainDateISO();
let month = monthMap[date.month - 1];
let day = date.day;

const firstDay = date.with({ day: 1 });
const lastDay = firstDay.add({ months: 1 }).subtract({ days: 1 });
const weekendsList = document.querySelector('.dates-list');
const playbill = document.querySelector('.playbill');
const performancesList = document.querySelector('.performances-list')

function getWeekends(startDate, endDate) {
    const weekends = [];
    let currentDate = startDate;

    while (Temporal.PlainDate.compare(currentDate, endDate) <= 0){
        const dayOfWeek = currentDate.dayOfWeek
        if (dayOfWeek == 6 || dayOfWeek == 7) {
            weekends.push(currentDate.day);
        }
        currentDate = currentDate.add({days: 1});
    }
    return weekends
}

const weekends = getWeekends(firstDay, lastDay) 

function displayDates() {
    for (let day of weekends){
        const weekendsListItemWprapper = document.createElement('li');
        weekendsListItemWprapper.classList.add("swiper-slide");

        const weekendsListItem = document.createElement('span')
        weekendsListItem.classList.add("dates-list__item")
        weekendsListItem.textContent = `${day} ${month}`;
        
        
        let charmonth = date.month < 10 ? `0${date.month}` : `${date.month}`;
        weekendsListItem.dataset.date = `${day}.${charmonth}`;

        weekendsListItemWprapper.append(weekendsListItem);
        weekendsList.append(weekendsListItemWprapper);
    }
    const weekendsListItemWprapper = document.createElement('li');
    weekendsListItemWprapper.classList.add("swiper-slide");

    const weekendsListItem = document.createElement('span')
    weekendsListItem.textContent = "Сбросить фильтр";
    weekendsListItem.classList.add("dates-list__item", "remove-filter");

    weekendsListItemWprapper.append(weekendsListItem);
    weekendsList.append(weekendsListItemWprapper);
}
displayDates();

const performancesDates = document.querySelectorAll(".dates-list__item");
const performancesItem = document.querySelectorAll(".performances-list__item")
const removeFilter = document.querySelector(".remove-filter")
const modal = document.querySelector(".hidden-modal")

function updateCounter(){
    let visiblePerformance = 0;
    for (let performance of performancesItem){
        if (!performance.classList.contains("hidden")){
            visiblePerformance++;
        }
    }
    modal.classList.toggle("hidden-modal", visiblePerformance !== 0)
    modal.classList.toggle("zero-performances", visiblePerformance === 0) 
}

for (let date of performancesDates) {
    date.addEventListener("click", () => {

        for (let performance of performancesItem) {

            const shouldHide = performance.dataset.date !== date.dataset.date;

            performance.classList.toggle("hidden", shouldHide);
        }

        updateCounter();
    });
}

removeFilter.addEventListener("click", () => {

    for (let performance of performancesItem) {
        performance.classList.remove("hidden");
    }

    updateCounter();
});

const swiper = new Swiper('.dates-list-swiper', {
    freeMode: true,
    spaceBetween: 15,
    mousewheel: true,
    mousewheel: {
        sensitivity: 0.6,
    },
    slidesPerView: 'auto',
    resistance: true,
    resistanceRatio: 0.85,
});

const buyButtons = document.querySelectorAll(".buy-ticket")

for(let buyButton of buyButtons){
    buyButton.addEventListener("click", (event) =>{
        event.preventDefault();
        console.log('click')
    })
}
const allReviews = document.querySelector(".all-reviews")
const dramaSchool = document.querySelector(".teatralka")
const tnt = document.querySelector(".folk-art-theater")
const performance = document.querySelector(".performances")
const service = document.querySelector(".service")
const reviews = document.querySelectorAll(".review-list__item")
const likes = document.querySelectorAll(".feedback__like")
const form = document.querySelector(".write-review");
const modalReview = document.querySelector("#review-modal__review");
const modalLike = document.querySelector("#review-modal__like");
const closeBtn = document.querySelectorAll("#close-modal");
const topicList = document.querySelectorAll(".topic-list__item")


const refreshReviewList = function(activeTopic) {
    const tl = gsap.timeline()

    tl.to(reviews, {
        opacity: 0,
        scale: 0.3,
        duration: 0.3,
        onComplete: () => {
            for (let review of reviews) {
                review.style.display = "none"
            }
        }
    })

    tl.add(() => {
        for (let review of reviews) {
            if (activeTopic === review.dataset.topic || activeTopic === undefined) {
                review.style.display = "grid"
                gsap.fromTo(review,
                    { opacity: 0, scale: 0.3 },
                    { opacity: 1, scale: 1, duration: 0.3 }
                )
            }
        }
    })
}

allReviews.addEventListener("click", ()=> {
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    refreshReviewList()
})

dramaSchool.addEventListener("click", ()=> {
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    refreshReviewList(dramaSchool.dataset.topic)
})

tnt.addEventListener("click", ()=> {
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    tnt.classList.add("active-topic")
    refreshReviewList(tnt.dataset.topic)
})

performance.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    performance.classList.add("active-topic")
    refreshReviewList(performance.dataset.topic)
})

service.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    service.classList.add("active-topic")
    refreshReviewList(service.dataset.topic)
})

likes.forEach(like => {

    like.addEventListener("click", async () => {

        const reviewId =  like.dataset.reviewid;

        const response = await fetch(
            `/reviews/${reviewId}/like`,
            {
                method: "POST"
            }
        );

        const result = await response.json();

        if (result.success) {
            let counter = like.closest('.feedback').querySelector(".feedback__counter")

            counter.textContent = result.likes;

            like.classList.add("liked")
        }
        else {

            modalLike.classList.add("active");
            document.body.classList.add("disable-scroll");
        }
    });

});

const swiper = new Swiper('.topic-list-swiper', {
    freeMode: true,
    spaceBetween: 15,
    mousewheel: true,
    mousewheel: {
        sensitivity: 0.6,
    },
    slidesPerView: 'auto',
    resistance: true,
    resistanceRatio: 0.85,
});



form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("/reviews", {
        method: "POST",
        body: new URLSearchParams(formData)
    });

    if (response.ok) {
        modalReview.classList.add("active");
        document.body.classList.add("disable-scroll");
        form.reset();
    }
});

for (let button of closeBtn){
        button.addEventListener("click", () => {
        modalReview.classList.remove("active");
        modalLike.classList.remove("active");
        document.body.classList.remove("disable-scroll");
    });
}
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", function(event) {
        if (event.target === this) {
            this.classList.remove("active");
            document.body.classList.remove("disable-scroll");
        }
    });
});
const tntSwiper = new Swiper('.tnt__swiper', {
    parallax: true,
    watchSlidesProgress: true,
    speed: 600,

    pagination: {
        el: ".swiper-pagination"
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
Fancybox.bind("[data-fancybox]", {
    
});const actorLinks = document.querySelectorAll(".actors-list__link");
for (let actorLink of actorLinks) {
    actorLink.addEventListener("click", (event)=>{
        let actorId = actorLink.getAttribute("data-actorId")
        sessionStorage.setItem("selectedActorId", actorId)
    })
}
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
    const swiper = document.querySelector('.about-theatre__swiper');

	btn.addEventListener('click', function(){
        const swiper = document.querySelector('.about-theatre__swiper');
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
                const currentY = swiper.getBoundingClientRect().top - 
                        swiper.parentElement.getBoundingClientRect().top;
                if (aboutTrigger) {
                    aboutTrigger.kill();
                    aboutTrigger = null;
                }
                gsap.set(swiper, { y: currentY });
                gsap.to(swiper, {
                    y: 0,
                    duration: 0.9,
                    ease: "power2.inOut",     
                });
            }
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
