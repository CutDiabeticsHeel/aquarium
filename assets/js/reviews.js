const allReviews = document.querySelector(".all-reviews")
const dramaSchool = document.querySelector(".teatralka")
const tnt = document.querySelector(".folk-art-theater")
const performance = document.querySelector(".performances")
const service = document.querySelector(".service")
const reviews = document.querySelectorAll(".review-list__item")
const likes = document.querySelectorAll(".like")
const form = document.querySelector(".write-review");
const modal = document.querySelector("#review-modal");
const closeBtn = document.querySelector("#close-modal");
const topicList = document.querySelectorAll(".topic-list__item")

allReviews.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    for (let review of reviews){
        review.classList.remove("hidden")
    }
})

dramaSchool.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    dramaSchool.classList.add("active-topic")
    for (let review of reviews){

        const shouldHide = review.dataset.topic !== dramaSchool.dataset.topic;

        review.classList.toggle("hidden", shouldHide)
    }
})

tnt.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    tnt.classList.add("active-topic")
    for (let review of reviews){
        
        const shouldHide = review.dataset.topic !== tnt.dataset.topic;

        review.classList.toggle("hidden", shouldHide)
    }
})

performance.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    performance.classList.add("active-topic")
    for (let review of reviews){
        
        const shouldHide = review.dataset.topic !== performance.dataset.topic;

        review.classList.toggle("hidden", shouldHide)
    }
})

service.addEventListener("click", ()=>{
    for (let topic of topicList){
        topic.classList.remove("active-topic")
    }
    service.classList.add("active-topic")
    for (let review of reviews){
        
        const shouldHide = review.dataset.topic !== service.dataset.topic;

        review.classList.toggle("hidden", shouldHide)
    }
})

likes.forEach(like => {

    like.addEventListener("click", async () => {

        const reviewId =  like.dataset.reviewid;
        console.log(reviewId)

        const response = await fetch(
            `/reviews/${reviewId}/like`,
            {
                method: "POST"
            }
        );

        const result = await response.json();

        if (result.success) {

            like.textContent =
                result.likes;

            like.disabled = true;
        }
        else {

            alert(result.message);
        }
    });

});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("/reviews", {
        method: "POST",
        body: new URLSearchParams(formData)
    });

    if (response.ok) {
        modal.classList.add("active");
        form.reset();
    }
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});