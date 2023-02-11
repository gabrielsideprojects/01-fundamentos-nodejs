import http from 'node:http'
import { Transform } from 'node:stream'


class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)
        // First param: error'
        // Buffer -> Forma que o node transiciona dados entre streams.
        callback(null, Buffer.from(String(transformed)))
    }
}

// req => ReadableStream
// res => WritableStream


const server = http.createServer((req,res)=> {
    return req.pipe(new InverseNumberStream()).pipe(res)
})

server.listen(3334)