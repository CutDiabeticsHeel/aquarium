import gsap from "gsap";
function initFooterJs() {
    if (!document.querySelector(".main-footer")) return;
    const mapButton = document.querySelector(".map")
    const mapModal = document.querySelector(".theatre-location")
    const mapFrame = document.querySelector(".theatre-location__map");
    const closeModal = document.querySelector(".close-modal")
    const mapPicture = document.querySelector(".map-picture")
    let startRect  = null

    const loadMap = () => {
        if (mapFrame.src) return;
        mapFrame.src = mapFrame.dataset.src;
    };

    mapButton.addEventListener("pointerenter", loadMap, { once: true });
    mapButton.addEventListener("touchstart", loadMap, { once: true, passive: true });
    mapButton.addEventListener("focusin", loadMap, { once: true });

    const openMapModal = function () {
        loadMap();
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

        mapModal.classList.remove("hidden-modal");
        gsap.set(mapModal, { opacity: 0 });
        document.body.classList.add("disable-scroll");

        const mapRect = mapFrame.getBoundingClientRect();

        const tl = gsap.timeline();
        tl
            .to(mapPicture, {
                top: mapRect.top,
                left: mapRect.left,
                width: mapRect.width,
                height: mapRect.height,
                duration: 0.3,
                ease: "power2.out"
            })
            .to(mapModal, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, ">")
            .to(mapPicture, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
                zIndex: -1,
            }, "<")
    };

    const closeMapModal = function () {
        const mapRect = mapFrame.getBoundingClientRect();
        mapButton.append(mapPicture);
        document.body.append(mapPicture);

        gsap.set(mapPicture, {
            position: "fixed",
            top: mapRect.top,
            left: mapRect.left,
            width: mapRect.width,
            height: mapRect.height,
            opacity: 0,
            zIndex: 1000,
            margin: 0
        });

        document.body.classList.remove("disable-scroll");

        const tl = gsap.timeline();
        tl
            .to(mapModal, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            })
            .to(mapPicture, {
                opacity: 1,
                duration: 0.1,
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
                duration: 0.4,
                ease: "power2.out"
            }, "<")
            .call(() => {
                mapButton.append(mapPicture);
                gsap.set(mapPicture, { clearProps: "all" });
                mapModal.classList.add("hidden-modal");
                gsap.set(mapModal, { clearProps: "opacity" });
            });
    };

    mapButton.addEventListener("click", () => openMapModal())
    mapModal.addEventListener("click", function (event) {
        if (event.target === this) closeMapModal();
    })
    closeModal.addEventListener("click", () => closeMapModal())
};
initFooterJs();