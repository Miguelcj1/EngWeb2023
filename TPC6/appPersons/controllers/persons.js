var Person = require('../models/persons')


// Person list
module.exports.list = () => {
    return Person
    .find()
    .sort({nome: 1})
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.getPerson = id => {
    return Person
    .findOne({_id:id})
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.addPerson = p => {
    return Person
    .create(p)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.updatePerson = p => {
    return Person
    .updateOne({_id: p._id}, p)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.deletePerson = id => {
    return Person
    .deleteOne({_id: id})
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}