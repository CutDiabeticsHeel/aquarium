const mapButton = document.querySelector(".map-button")
const map = document.querySelector(".theatre-location")
const closeModal = document.querySelector(".close-modal")

mapButton.addEventListener("click", () => {
    map.classList.toggle("hidden")
})

map.addEventListener("click", function (event){
    if (event.target === this){
        map.classList.add("hidden")
    }
})

closeModal.addEventListener("click", () => {
    map.classList.add("hidden") 
})