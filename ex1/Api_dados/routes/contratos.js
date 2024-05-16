var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato');

/* GET lista de contratos em formato JSON */

router.get('/', function(req, res) {

    if (req.query.entidade) {
        Contrato.findByEntidade(req.query.entidade)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else if (req.query.tipo) {
        Contrato.findByTipoProcedimento(req.query.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else {
        Contrato.listar()
        .then(dados => {
            console.log(dados);
            res.jsonp(dados)})
        .catch(erro => res.status(500).jsonp(erro))
    }
});


/* GET da lista de entidades em formato JSON (sem enviar entidades com string vazia) */

router.get('/entidades', function(req, res) {
    Contrato.distinctEntidades()
    .then(dados => {
        var entidades = [];
        dados.forEach(entidade => {
            if (entidade != "") {
                entidades.push(entidade);
            }
        });
        res.jsonp(entidades);
    })
    .catch(erro => res.status(500).jsonp(erro))
});

/* GET da lista de tipos de procedimento em formato JSON (sem enviar tipos de procedimento com string vazia) */

router.get('/tipos', function(req, res) {
    Contrato.distinctTipos()
    .then(dados => {
        var tipos = [];
        dados.forEach(tipo => {
            if (tipo != "") {
                tipos.push(tipo);
            }
        });
        res.jsonp(tipos);
    })
    .catch(erro => res.status(500).jsonp(erro))
});

/* GET de um contrato em formato JSON */

router.get('/:id', function(req, res) {
    Contrato.findById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* POST de um novo contrato em formato JSON */

router.post('/', function(req, res) {
    Contrato.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* PUT de um contrato em formato JSON */

router.put('/:id', function(req, res) {
    Contrato.updateContratoById(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* DELETE de uma planta em formato JSON */

router.delete('/:id', function(req, res) {
    Contrato.deleteById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
