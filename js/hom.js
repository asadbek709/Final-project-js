// API - https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product
const Close = document.querySelector("#close")
const submit = document.querySelector("#submit")
const closeIcon = document.querySelector("#closeIcon")
const add = document.querySelector("#add")
const modal = document.querySelector(".modal")
const blur = document.querySelector(".blur")
const form = document.querySelector("#form")

const fullName = document.querySelector(".fUllName")
const phoneNumber = document.querySelector(".phoneNumber")
const brithday = document.querySelector(".brithday")
const address = document.querySelector(".address")
const course = document.querySelector(".course")

function closeAction() {
    modal.style.cssText = `
    display: none;
    `
    blur.style.cssText = `
    display: none;
    `
}

Close.addEventListener("click", closeAction)
closeIcon.addEventListener("click", closeAction)
submit.addEventListener("click", function () {

const fullName = document.querySelector(".fUllName")
const phoneNumber = document.querySelector(".phoneNumber")
const brithday = document.querySelector(".brithday")
const address = document.querySelector(".address")
const course = document.querySelector(".course")
    let obj = {
        full_name: fullName.value,
        phone_number: phoneNumber.value,
        date: brithday.value,
        address: address.value,
        course: course.value,
    }

    if(obj) {
        fetch("https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product", {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json",
        },
        body: JSON.stringify(obj)
    })
    }
    // closeAction()
})


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