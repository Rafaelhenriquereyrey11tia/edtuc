document.querySelector("#btn-cadastro").addEventListener("click", async (event) => {
  event.preventDefault()

  const name = document.querySelector("#name").value
  const email = document.querySelector("#email").value
  const password = document.querySelector("#senha").value

  if (name === "" || email === "" || password === "") {
    alert("PREENCHA TODAS AS INFORMAÇÕES, animal!")
    return
  }

  const user = { name, email, password }

  try {
    const response = await fetch("http://localhost:8080/cadastrarEdutech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    })

    const data = await response.json()
    alert(data.message)
    window.location.href = "/jogo.html"
  } catch (error) {
    alert("Erro ao cadastrar. Verifique o servidor.")
    console.error(error)
  }
})