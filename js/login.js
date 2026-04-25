const mail = document.querySelectorAll(".inputBox")

Array.from(mail).forEach((div) => {
	let input = div.children[1]
	input.addEventListener("blur", function () {
		let input = div.children[1]
		if (!input.value) {
			input.style.cssText = `
			border: 1px solid rgba(255, 0, 0, 1);
			`
		}
	})

	  

	input.addEventListener("input", function () {
		let name = input.getAttribute("name")
		let firstvalue = input.value.split("@")[0]
		let isNumber = firstvalue.split("").some((s) => !isNaN(s) && s !== " ")
		let isUpper = firstvalue.split("").filter((s) => s !== s.toUpperCase() || s !== s.toLowerCase()) .some((s) => s === s.toUpperCase())

		if (name === "email") {
			if (input.value.endsWith("@gmail.com") && firstvalue.length >= 8 && isNumber && !isUpper) {
				input.style.cssText = `
				border: 1px solid transparent;
			`
			}else{
			input.style.cssText = `
			border: 1px solid rgba(255, 0, 0, 1);
			`
			}
			
		}

		if(name === "password") {
			let arr = input.value.split("") 
			let isRepeat = arr.some((s, i, arr) => s === arr[i + 1])
			let isUpper = arr.some((s) => s === s.toUpperCase())
			let isLower = arr.some((s) =>  s === s.toLowerCase())
			let isNumber = arr.some((s) =>  !isNaN(s))
			let isSymbol = arr.some((s) =>  isNaN(s) && s === s.toUpperCase() && s === s.toLowerCase())

			if(!isRepeat && input.value.length >= 8 && isUpper && isLower && isNumber && isSymbol) {
				input.style.cssText = `
				border: 1px solid transparent;
			`
			}else{
				input.style.cssText = `
				border: 1px solid rgba(255, 0, 0, 1);
			`
			}
		}
	})
})

const eye = document.querySelector(".eye")
const eye_slash = document.querySelector(".eye_slash")
const password_inp = document.querySelector(".password_inp")

eye_slash.addEventListener("click", function () {
	eye.style.cssText = `
	visibility: visable;
	`
	eye_slash.style.cssText = `
	visibility: hidden;
	`

	password_inp.type = "text"
})

eye.addEventListener("click", function () {
	eye.style.cssText = `
	visibility: hidden;
	`
	eye_slash.style.cssText = `
	visibility: visable;
	`
	password_inp.type = "password"
})


const label = document.querySelector(".label")
label.addEventListener("selectstart", function (e) {
	e.preventDefault()
})

const btn = document.querySelector(".btn")

btn.addEventListener("click", function(e) {
	e.preventDefault()
	let email = document.querySelector("#email")
	let pass = document.querySelector("#pass")

	if(email.getAttribute("style").endsWith("transparent;") && pass.getAttribute("style").endsWith("transparent;")) {
		
		fetch("https://692ad71d7615a15ff24dd733.mockapi.io/login")
		.then((res) => res.json())
		.then(([obj]) => {
			if(obj.email === email.value && obj.password === pass.value){
				window.location.pathname = "/home.html"
			}else{
				alert("siz email yoki parolni noto'g'ri kiritdingiz. qayta urinib koring")
				pass.value = ""
				email.value = ""
			}
		})
	}
})