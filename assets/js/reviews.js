function initReviewJs(){
    if (!document.querySelector(".reviews")) return;
    const allReviews = document.querySelector(".all-reviews")
    const dramaSchool = document.querySelector(".teatralka")
    const tnt = document.querySelector(".folk-art-theater")
    const performance = document.querySelector(".performances")
    const service = document.querySelector(".service")
    const reviews = document.querySelectorAll(".review-list__item")
    const likes = document.querySelectorAll(".feedback__like")
    const form = document.querySelector(".write-review");
    const modalReview = document.querySelector("#review-modal__review");
    const modalReviewContent = document.querySelector(".review-js");
    const modalLike = document.querySelector("#review-modal__like");
    const modalLikeContent = document.querySelector(".like-js");
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

    const openModal = function(modal){
        gsap.fromTo(modal, 
            {
                scale: 0.1,
                opacity: 0.1
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }
        )
    }

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
                openModal(modalLikeContent);
                modalLike.classList.add("active");
                document.body.classList.add("disable-scroll");
            }
        });

    });

    const Reviewswiper = new Swiper('.topic-list-swiper', {
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
            openModal(modalReviewContent);
            modalReview.classList.add("active");
            document.body.classList.add("disable-scroll");
            form.reset();
        }
    });

    const closeModal = function(modal){
        gsap.to(modal, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                modalReview.classList.remove("active");
                modalLike.classList.remove("active");
                gsap.set(modal, { clearProps: "all" });
            }
        })
    }

    for (let button of closeBtn){
            button.addEventListener("click", () => {
            closeModal(modalLikeContent);
            closeModal(modalReviewContent);
            document.body.classList.remove("disable-scroll");
        });
    }

    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", function(event) {
            if (event.target === this) {
                closeModal(modalLikeContent);
                closeModal(modalReviewContent);
                document.body.classList.remove("disable-scroll");
            }
        });
    });
};
initReviewJs();
