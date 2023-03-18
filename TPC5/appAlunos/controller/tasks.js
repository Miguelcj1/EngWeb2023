var axios = require('axios')

// Task list
module.exports.taskList = () => {
    return axios.get('http://localhost:3000/tasks')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getAluno = id => {
    return axios.get('http://localhost:3000/alunos/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addAluno = a => {
    return axios.post('http://localhost:3000/alunos', a)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.editAluno = a => {
    return axios.put('http://localhost:3000/alunos/' + a.id, a)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteAluno = id => {
    return axios.delete('http://localhost:3000/alunos/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}