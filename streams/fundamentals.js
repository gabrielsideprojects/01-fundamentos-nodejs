// Streams -> 

// Tudo que eu recebo como entrada (process.stdin) estou encaminhando (pipe) para uma saída ( process stdout).

// process.stdin -> Readable Stream
// proccess.stdout -> Writable Stream
// process.stdin.pipe(process.stdout)
// Tem também a stream Duplex -> Ler e escreve.

import { Readable, Writable, Transform } from 'node:stream'

// Exemplo de stream de leitura.
class OneToHundredStream extends Readable {
    index = 1

    _read(){
      const i = this.index++
      setTimeout(() => {
        if (i > 100) {
            this.push(null)
          } else {
            const buf = Buffer.from(String(i))
    
            this.push(buf)
          }
      }, 1000);
    
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1
        // First param: error'
        // Buffer -> Forma que o node transiciona dados entre streams.
        callback(null, Buffer.from(String(transformed)))
    }
}

// Processa o dado -> Não transforma
class MultiplyByTenStream extends Writable {
    // chunk: "Pedaço" enviado da stream de leitura;
    // enconding: Como essa info está codificada;
    // callback: Fn que a stream de escrita precisa chamar quando ela acabar de processar os dados.
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString())*10)
        callback()
    }
}


new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())