const mapButton = document.querySelector(".map")
const map = document.querySelector(".theatre-location")
const closeModal = document.querySelector(".close-modal")
const mapPicture = document.querySelector(".map-picture")
let startRect  = null

const openMapModal = function () {
    startRect = mapPicture.getBoundingClientRect();

    document.body.append(mapPicture);

    gsap.set(mapPicture, {
        position: "fixed",
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        opacity: 1,
        zIndex: 1000,
        margin: 0
    });

    map.classList.remove("hidden-modal");
    gsap.set(map, { opacity: 0 });
    document.body.classList.add("disable-scroll");

    const tl = gsap.timeline();
    tl.to(mapPicture, {
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            width: "80%",
            height: "57%",
            duration: 0.5,
            ease: "power2.out"
        })
        .to(map, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        }, ">")
        .to(mapPicture, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out"
        }, "<")
};

const closeMapModal = function () {
    mapButton.append(mapPicture);
    document.body.append(mapPicture);

    gsap.set(mapPicture, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "80%",
        height: "57%",
        opacity: 0,
        zIndex: 1000,
        margin: 0
    });

    document.body.classList.remove("disable-scroll");

    const tl = gsap.timeline();
    tl.to(map, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        })
        .to(mapPicture, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
        }, "<")
        .to(mapPicture, {
            top: startRect.top + startRect.height / 2,
            left: startRect.left + startRect.width / 2,
            xPercent: -50,
            yPercent: -50,
            width: startRect.width,
            height: startRect.height,
            opacity: 0.8,
            duration: 0.5,
            ease: "power2.out"
        })
        .call(() => {
            mapButton.append(mapPicture);
            gsap.set(mapPicture, { clearProps: "all" });
            map.classList.add("hidden-modal");
            gsap.set(map, { clearProps: "opacity" });
        });
};

mapButton.addEventListener("click", () => openMapModal())
map.addEventListener("click", function (event) {
    if (event.target === this) closeMapModal();
})
closeModal.addEventListener("click", () => closeMapModal())
