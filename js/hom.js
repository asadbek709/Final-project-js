const Close = document.querySelector("#close")
const submit = document.querySelector("#submit")
const closeIcon = document.querySelector("#closeIcon")
const add = document.querySelector("#add")
const modal = document.querySelector(".modal")
const blur = document.querySelector(".blur")
const form = document.querySelector("#form")

function closeAction() {
    modal.style.cssText = `
    display: none;
    `
    blur.style.cssText = `
    display: none;
    `
}

Close.addEventListener("click", closeAction)
submit.addEventListener("click", closeAction)
closeIcon.addEventListener("click", closeAction)

add.addEventListener("click", function () {
    modal.style.cssText = `
    display: block;
    `
    blur.style.cssText = `
    display: block;
    `
})

form.addEventListener("click", function (e) {
    e.preventDefault()
})