const header = document.querySelector(".main-header")
const toggle = document.querySelector(".main-navigation__toggle")
const navigationMenu = document.querySelector(".main-navigation")

toggle.addEventListener("click", ()=>{
    navigationMenu.classList.toggle("close")
    navigationMenu.classList.toggle("opened")
    document.body.classList.toggle("no-scroll");
})