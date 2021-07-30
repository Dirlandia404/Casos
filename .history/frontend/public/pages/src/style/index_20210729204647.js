const buttonSearch = document.querySelector("#header-2 a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")


buttonSearch.addEventListener("click", () =>{
    modal.classList.remove("hide")
})

close.addEventListener("click", () =>{
    modal.classList.add("hide")
})