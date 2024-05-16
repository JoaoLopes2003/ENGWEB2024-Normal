const Contrato = require('../models/contrato');

module.exports.listar = () => {
    return Contrato
        .find()
        .sort({_id: 1})
        .exec()
}

module.exports.findById = id => {
    return Contrato
        .findOne({_id: id})
        .exec()
}

module.exports.findByEntidade = entidade => {
    return Contrato
        .find({entidade_comunicante: entidade})
        .sort({_id: 1})
        .exec()
}

module.exports.findByTipoProcedimento = tipo => {
    return Contrato
        .find({tipoprocedimento: tipo})
        .sort({_id: 1})
        .exec()
}

module.exports.distinctEntidades = () => {
    return Contrato
        .distinct('entidade_comunicante')
        .sort()
        .exec()
}

module.exports.distinctTipos = () => {
    return Contrato
        .distinct('tipoprocedimento')
        .sort()
        .exec()
}

module.exports.insert = contrato => {
    return Contrato.create(contrato)
}

module.exports.updateContratoById = (id, contrato) => {
    return Contrato.updateOne({_id:id}, contrato)
}

module.exports.deleteById = id => {
    return Contrato.deleteOne({ _id: id })
}
