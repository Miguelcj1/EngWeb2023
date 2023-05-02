var Exames = require('../models/exames')


module.exports.exames = () => {
    return Exames.aggregate([
        {$project:{
            _id:1,
            nome:1,
            dataEMD:1,
            resultado:1
        }}
    ])
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getExames = id => {
    return Exames.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.modalidades = () => {
    return Exames.aggregate([
        {$group:{
            _id:"$modalidade"
        }}
    ])
    .then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })
}

module.exports.modalidadesArg = (modalidade) => {
    return Exames.find({modalidade: modalidade})
    .then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })
}

module.exports.resOK = () => {
    return Exames.find({resultado:true})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.examesAtletasClube = (clube) => {
    return Exames.find({"clube":clube},{_id:0,nome:1}).sort({"nome":1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}


module.exports.examesGen = (genero) => {
    if(genero == "M" || genero == "F"){
        return Exames.find({"género":genero},{_id:0,nome:1}).sort({'nome':1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
    }
}
