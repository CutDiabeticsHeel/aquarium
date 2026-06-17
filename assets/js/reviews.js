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
            if (!activeTopic || review.dataset.topic === activeTopic.dataset.topic) {
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
    dramaSchool.classList.add("active-topic")
    refreshReviewList()
})

tnt.addEventListener("click", ()=> {
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    tnt.classList.add("active-topic")
    refreshReviewList()
})

performance.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    performance.classList.add("active-topic")
    refreshReviewList()
})

service.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    service.classList.add("active-topic")
    refreshReviewList()
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