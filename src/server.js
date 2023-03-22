import http from 'node:http'

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

const users = []

const server = http.createServer(async (req,res)=> {
    const {method, url} = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
        req.body = null
    }

    if(method === 'GET' && url === '/users') {
        return res.
        setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users') {
        const {name, email} = req.body
        users.push({
            id: 1,
            name,
            email
        })

        return res.writeHead(201).end()
    }


    return res.writeHead(404).end()
})

server.listen(3333)