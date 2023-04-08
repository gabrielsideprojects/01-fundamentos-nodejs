import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

//UUID => Unique Universal ID;

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end => Muitas informações
// PATCH => Atualizar uma informação específica de um reurso no back-end
// Delete => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// post /USERS => Criar um usuário no back-end

// Stateful: Vai ter alguma informação guardada em memória.
// Stateless

// JSON - Javascript Object Notation

// Cabeçalhos (Requisição/resposta) => Metadados.

// HTTP Status Code - Importância semântica entre front e back-end.
//201 - Created

const database = new Database()

const server = http.createServer(async (req,res)=> {
    const {method, url} = req

   await json(req,res)

    if(method === 'GET' && url === '/users') {
        const users = database.select('users')

        return res.end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users') {
        const {name, email} = req.body
        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user)

        return res.writeHead(201).end()
    }


    return res.writeHead(404).end()
})

server.listen(3333)