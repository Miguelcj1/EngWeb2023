const mongoose = require('mongoose')


var personSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    idade: Number,
    sexo: String,
    morada: {
        cidade: String,
        distrito: String
    },
    BI: String,
    CC: String,
    descricao: String,
    profissao: String,
    partido_politico: {
        party_abbr: String,
        party_name: String
    },
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: {
        fumador: Boolean,
        gosta_cinema: Boolean,
        gosta_viajar: Boolean,
        acorda_cedo: Boolean,
        gosta_ler: Boolean,
        gosta_musica: Boolean,
        gosta_comer: Boolean,
        gosta_animais_estimacao: Boolean,
        gosta_dancar: Boolean,
        comida_favorita: String
    }
});

module.exports = mongoose.model('person', personSchema)