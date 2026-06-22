const mapButton = document.querySelector(".map")
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
})