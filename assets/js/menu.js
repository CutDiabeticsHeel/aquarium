const toggle = document.querySelector(".main-navigation__toggle")
const navigationMenu = document.querySelector(".main-navigation")

toggle.addEventListener("click", ()=>{
    navigationMenu.classList.toggle("close")
    navigationMenu.classList.toggle("opened")
    document.body.classList.toggle("disable-scroll");
})
document.querySelectorAll('.navigation-list .under-line-link').forEach(link => {
    link.addEventListener('click', () => {
        
        navigationMenu.classList.remove('opened');
        navigationMenu.classList.add('close');
        document.body.classList.remove('disable-scroll');
    });
});
