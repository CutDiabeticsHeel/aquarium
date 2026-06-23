function initTroupeJs(){
    if (!document.querySelector(".troupe-section")) return;
    const actorLinks = document.querySelectorAll(".actors-list__link");
    for (let actorLink of actorLinks) {
        actorLink.addEventListener("click", (event)=>{
            let actorId = actorLink.getAttribute("data-actorId")
            sessionStorage.setItem("selectedActorId", actorId)
        })
    }
};
initTroupeJs();
