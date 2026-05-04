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
const search = document.querySelector("#search")


function createdUI(arr) {
    let tbody = document.querySelector("#tbody")
    tbody.innerHTML = ""

    arr.forEach((obj) => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.textContent = obj.id
        tr.append(td1)

        let td2 = document.createElement("td")
        td2.textContent = obj.full_name
        tr.append(td2)

        let td3 = document.createElement("td")
        td3.textContent = obj.phone_number
        tr.append(td3)

        let td4 = document.createElement("td")
        td4.textContent = obj.date
        tr.append(td4)

        let td5 = document.createElement("td")
        td5.textContent = obj.address
        tr.append(td5)

        let td6 = document.createElement("td")
        td6.textContent = obj.course
        tr.append(td6)


        let td_del = document.createElement("td")
        td_del.innerHTML = `<button class="del_btn" id="add">Delete <img src="./assets/icons/trash-can-solid-full.svg" alt=""> </button>`
        td_del.setAttribute("class", "del")
        td_del.setAttribute("del_id", obj.id)
        tr.append(td_del)

        let td_edit = document.createElement("td")
        td_edit.innerHTML = `<button class="edit_btn" id="add">Edit<img src="./assets/icons/pen-to-square-solid-full.svg" alt="">    </button>`
        td_edit.setAttribute("class", "edit")
        td_edit.setAttribute("edit_id", obj.id)
        tr.append(td_edit)

        tbody.append(tr)
    });

    let td_del = document.querySelectorAll(".del")

    Array.from(td_del).forEach((td) => {
        td.addEventListener("click", function (e) {
            let id = e.target.parentElement.getAttribute("del_id")
            fetch(`https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product/${id}`, {
                method: "DELETE",
            }).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    alert("Malumot to'g'ri o'chirildi ✅")
                    getData()
                }
            }).catch((error) => {
                alert(error.name)
            })

        })
    })

    let td_edit = document.querySelectorAll(".edit")
    Array.from(td_edit).forEach((td) => {
        td.addEventListener("click", function () {
            let edit_id = this.getAttribute("edit_id")

            modal.style.cssText = `
                display: block;
            `
            blur.style.cssText = `
                display: block;
            `

            let arr = td.parentElement.children

            fullName.value = arr[1].textContent;
            phoneNumber.value = arr[2].textContent;
            brithday.value = arr[3].textContent;
            address.value = arr[4].textContent;
            course.value = arr[5].textContent;
            submit.textContent = "Update"
            submit.setAttribute("edit_id", edit_id)

        })


    })
}


function getData() {
    fetch("https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product")
        .then((res) => res.json())
        .then((res) => {
            createdUI(res)
        })
}
getData()


function closeAction() {
    modal.style.cssText = `
    display: none;
    `
    blur.style.cssText = `
    display: none;
    `

    fullName.value = "";
    phoneNumber.value = "";
    brithday.value = "";
}

Close.addEventListener("click", closeAction)
closeIcon.addEventListener("click", closeAction)
submit.addEventListener("click", function () {

    let edit_id = this.getAttribute("edit_id")

    let obj = {
        full_name: fullName.value,
        phone_number: phoneNumber.value,
        date: brithday.value,
        address: address.value,
        course: course.value,
    }

    if (Object.values(obj).length === 5) {
        fetch(edit_id ? `https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product/${edit_id}` : "https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product", {
            method: edit_id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                closeAction()
                getData()
                edit_id ? alert("Malumot to'g'ri yangilandi ✅") : alert("Malumot to'g'ri saqlandi ✅");
            }
        }).catch((error) => {
            alert(error.name)
        })
    } else {
        alert("‼️ malumotni toliq toldiring")
    }


})


add.addEventListener("click", function () {
    modal.style.cssText = `
    display: block;
    `
    blur.style.cssText = `
    display: block;
    `
    submit.textContent = "Submit"
    submit.removeAttribute("edit_id")
})

// form.addEventListener("click", function (e) {
//     e.preventDefault()
// })

let filter = document.querySelector("#filter")
filter.addEventListener("change", function (e) {
    let value = e.target.value;
    fetch("https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product")
        .then((res) => res.json())
        .then((res) => {
            let newRes = res.sort((a, b) => a[value].localeCompare(b[value]))
            createdUI(newRes)
        })
})


search.addEventListener("change", function () {
    fetch("https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product")
        .then((res) => res.json())
        .then((res) => {
            let newRes = res.filter((obj)=>obj.full_name.toLowerCase().includes(this.value.toLowerCase()));
            createdUI(newRes)
        })
})