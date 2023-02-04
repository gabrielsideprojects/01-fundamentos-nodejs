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

const server = http.createServer((req,res)=> {
    const {method, url} = req

    if(method === 'GET' && url === '/users') {
        return res.end('Listagem de usuários')
    }

    if(method === 'POST' && url === '/users') {
        return res.end('Criação de usuário')
    }

    console.log(method, url)

    return res.end('Hello World')
})

server.listen(3333)