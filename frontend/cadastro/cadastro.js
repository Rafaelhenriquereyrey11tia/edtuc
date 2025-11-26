const button = document.querySelector("button")
button.onclick = (event) => {
    event.preventDefault()
    signUpKraken()
}


async function signUpKraken() {
   const name = document.querySelector("#name").value
   const email = document.querySelector("#email").value
   const password = document.querySelector("#password").value

   if (name === "" || email === "" || password === ""){
    alert("PREENCHA TODAS AS INFORMAÇÕES, animal!")
    return
   }

   const user =  {
    name,
    email,
    password
   }

   const response = await fetch("http://localhost:3333/cadastrarEdutech", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
   }).then(response => response.json())

   const { message } = response

   alert(message)

   window.location.href = "../../index.html"
}