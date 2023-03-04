var http = require('http');
var axios = require('axios');
var mypages = require('./mypages')
var fs = require('fs');

const porta = 7777

http.createServer(function (req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            console.log("Recuperei " + pessoas.length + " registos")

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genHome(pessoas,d))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url == '/pessoas/' || req.url.match(/\/pessoas\/(asc|desc)/)){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            console.log("Recuperei " + pessoas.length + " registos")

            var ordem = decodeURI(req.url.substring(9))
            var pessoasOrdenadas = pessoas
            if(ordem){
                if(ordem.match('asc')){
                    pessoasOrdenadas = pessoas.sort(
                        (p1,p2) => (p1.nome < p2.nome) ? -1 : 1
                    )
                }
                else if(ordem.match('desc')){
                    pessoasOrdenadas = pessoas.sort(
                        (p1,p2) => (p1.nome < p2.nome) ? 1 : -1
                    )
                }
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoasOrdenadas, d, 'Lista de Pessoas na Base de Dados'))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url.match(/p\d+/)){

        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genPessoaPage(pessoas, d))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url == '/pessoas/sexo'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data            
            var pessoasSexo = {
                'masculino': 0,
                'feminino': 0,
                'outro': 0
            }
            for(let i=0; i<pessoas.length; i++){
                pessoasSexo[pessoas[i].sexo] += 1
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genSexosPage(pessoasSexo, d, `Distribuição por sexo`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url.match(/\/pessoas\/sexo=\w/)){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            var sexo = decodeURI(req.url.substring(14))
            
            var pessoasSexo = []
            for(let i=0; i<pessoas.length; i++){
                if(pessoas[i].sexo == sexo){
                    pessoasSexo.push(pessoas[i])
                }
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoasSexo, d, `Lista de Pessoas do sexo ${sexo}`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url == '/pessoas/desportos'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data            
            var pessoasDesportos = {}
            for(let i=0; i<pessoas.length; i++){
                desportos = new Set(pessoas[i].desportos)
                desportos = Array.from(desportos)
                for(let j=0; j<desportos.length; j++){
                    if(desportos[j] in pessoasDesportos){
                        pessoasDesportos[desportos[j]] += 1
                    }
                    else{
                        pessoasDesportos[desportos[j]] = 1
                    }
                }
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genDesportosPage(pessoasDesportos, d, `Lista de Desportos`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url.match(/\/pessoas\/desportos=\w/)){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            var desporto = decodeURI(req.url.substring(19))
            
            var pessoasDesporto = []
            for(let i=0; i<pessoas.length; i++){
                if(pessoas[i].desportos.includes(desporto)){
                    pessoasDesporto.push(pessoas[i])
                }
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoasDesporto, d, `Lista de Pessoas que praticam ${desporto}`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url.match(/\/pessoas\/profissao=\d/)){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            var num = decodeURI(req.url.substring(19))
            
            var pessoasProfissao = {}
            for(let i=0; i<pessoas.length; i++){
                var profissao = pessoas[i].profissao
                if(profissao in pessoasProfissao){
                    pessoasProfissao[profissao] += 1
                }
                else{
                    pessoasProfissao[profissao] = 1
                }
            }

            const topProfissao = Object.fromEntries(
                Object.entries(pessoasProfissao).sort(([,a], [,b]) => b - a).slice(0,num)
            );


            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genProfissaoPage(topProfissao, d, `Top ${Object.keys(topProfissao).length} de profissões na lista de pessoas`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url.match(/\/pessoas\/profissao=[a-zA-z]/)){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data            
            var profissao = decodeURI(req.url.substring(19))
            
            var pessoasProfissao = []
            for(let i=0; i<pessoas.length; i++){
                if(pessoas[i].profissao.includes(profissao)){
                    pessoasProfissao.push(pessoas[i])
                }
            }


            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoasProfissao, d, `Lista de Pessoas que praticam a profissão de ${profissao}`))
        })
        .catch(erro => {   // É UMA FUNÇÃO. A MESMA COISA DO QUE function(erro){}
            console.log("Erro: " + erro)

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }
    else if(req.url.match('/w3.css')){
        fs.readFile('w3.css', function(err,data){
            res.writeHead(200,{'Content-Type': 'text/css'});
            if(err){
                res.write("Erro na leitura do ficheiro " + err)
            }
            else{
                res.write(data)
            }
            res.end();
        })
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'});
        res.end("<p>Erro: Operação não suportada...</p>")
    }

}).listen(porta)


console.log("Servidor à escuta na porta " + porta +"...");