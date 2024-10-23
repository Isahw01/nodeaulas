const express = require("express")
const app = express()
const port = 5000
const path = require ('path')
const caminho = path.join(__dirname, 'pages')

app.use((req, res, next) =>{
    res.status(404).sendFile(`${caminho}/404.html`)
})

app.listen(port,
     console.log(` Servidpr rodando na porta ${port}`))

//Trabalhar com post
app.get('/users/cadastrar', (req, res) =>{
    res.sendFile(`${caminho}/cadastro.html`)
})

//converte o body em filho de json
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

app.post("/users/save", (req, res) =>{
    console.log(req.body)

    const login = req.body.usuario
    const senha = req.body.senha

    console.log(`Login do individuo: ${login} e a senha dele é ${senha}`)
    res.sendFile(`${caminho}/cadastroConfirmado.html`)
})
// Simula ter usuario autenticado
const checaAutorizacao = (req, resp, next) => {
    req.authStatus = true

    if(req.authStatus){
        console.log("Usuario autenticado")
    }
    else{
        console.log("Usuario não possui permissão para acessar")
    }
    next()
}

app.use(checaAutorizacao)

app.get("/users/:id", (req, res) => {
    const id = req.params.id

    console.log(`usuario ${id} foi encontrado no banco`)
    res.sendFile(`${caminho}/users.html`)
})

app.get("/home", (req, res) => {
    res.sendFile(`${caminho}/index.html`)
})

app.get("/", (req, res) =>{
    res.send("Olá mundo")
})

app.listen(port,
     console.log(` Servidpr rodando na porta ${port}`))
     