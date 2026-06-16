const mapButton = document.querySelector(".map-button")
const map = document.querySelector(".theatre-location")
const closeModal = document.querySelector(".close-modal")

mapButton.addEventListener("click", () => {
    map.classList.toggle("hidden")
    document.body.classList.add("no-scroll");
})

map.addEventListener("click", function (event){
    if (event.target === this){
        map.classList.add("hidden")
        document.body.classList.remove("no-scroll");
    }
})

closeModal.addEventListener("click", () => {
    map.classList.add("hidden") 
    document.body.classList.remove("no-scroll");
})