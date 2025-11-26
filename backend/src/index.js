import express, { response } from "express"
import cors from "cors"
import mysql from "mysql2"

const app = express()
app.use(cors())
app.use(express.json())
const port = 3333
app.get("/", (request, response) => {
    const selectCommand = "SELECT name, email password FROM heitorpereira_sala02ma"

database.query(selectCommand, (error, users) => {
    if(error){
        console.log(error)
        return
    }

    response.json(users)
})

})


app.post("/cadastrar", (request, response) => {
    const {name, email, password} =  request.body.user

    const insertCommand = `
      INSERT INTO heitorpereira_sala02ma(name, email, password)
      VALUES (?, ?, ?)
    `

    database.query(insertCommand, [name, email, password], (error) => {
        if (error){
            console.log(error)
            return
        }

       response.status(201).json({message: "Usuário cadastrado com sucesso!"})
    })

    
})

// 3000, 3001, 3002, 3003, 3333, 5000, 5555, 5500, 8080

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}!`)
})

const database = mysql.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "web_02ma",
    connectionLimit: 10
})