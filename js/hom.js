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
        td_del.textContent = "❌"
        td_del.setAttribute("class", "del")
        td_del.setAttribute("del_id", obj.id)
        tr.append(td_del)

        tbody.append(tr)
    });

    let td_del = document.querySelectorAll(".del")

    Array.from(td_del).forEach((td) => {
        td.addEventListener("click", function(e) {
            let id = e.target.getAttribute("del_id")
           fetch(`https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product/${id}`, {
            method: "DELETE",
           }).then((res)=> {
             if (res.status >= 200 && res.status < 300) {
                alert("Malumot to'g'ri o'chirildi ✅")
                getData()
            }
           }).catch((error)=> {
            alert(error.name)
           })
            
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

    let obj = {
        full_name: fullName.value,
        phone_number: phoneNumber.value,
        date: brithday.value,
        address: address.value,
        course: course.value,
    }

    if (Object.values(obj).length === 5) {
        fetch("https://692ad71d7615a15ff24dd733.mockapi.io/api/v1/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                closeAction()
                getData()
                alert("Malumot to'g'ri saqlandi ✅")
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
})

form.addEventListener("click", function (e) {
    e.preventDefault()
})

