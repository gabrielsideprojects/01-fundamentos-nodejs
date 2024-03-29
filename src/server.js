import http from 'node:http'


import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

//Query Parameters: URL Stateful => Filtros, paginação ,não-obrigatório;
// Route Parameters: https://localhost:3333/users/1 -> Geralmente identificação de recurso;
// Request Body: Envio de informações de um formulário.

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



const server = http.createServer(async (req,res)=> {
    const {method, url} = req

   await json(req,res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        const {query, ...params} = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)