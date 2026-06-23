const curtains = document.querySelectorAll(".curtainContainer");
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
    openCurtains();
});
