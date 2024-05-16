var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET da página com todos os contratos */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get('http://localhost:16000/contratos')
    .then(dados => {
      res.render('contratos', { titulo: 'Lista de Contratos', data: d, contratos: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});

/* GET da página com os contratos de uma entidade */
router.get('/entidades/:nipc', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get('http://localhost:16000/contratos?entidade=' + req.params.nipc)
    .then(dados => {
      // Calcula o somatório dos valores dos contratos
      var somatorio = 0;
      dados.data.forEach(contrato => {
        somatorio += contrato.precoContratual;
      });

      res.render('entidade', { titulo: 'Entidade ' + req.params.entidade_comunicante + ' (' + req.params.nipc + ')', data: d, contratos: dados.data, somatorio: somatorio });
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});

// GET da página de um contrato
router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get('http://localhost:16000/contratos/' + req.params.id)
    .then(dados => {
      res.render('contrato', { titulo: 'Contrato ' + req.params.id, data: d, c: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});


module.exports = router;
