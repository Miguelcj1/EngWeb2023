var express = require('express');
var router = express.Router();
var Person = require('../controllers/persons')

/* GET home page. */
router.get('/persons', function(req, res, next) {
  Person.list()
  .then(dados => res.json(dados))
  .catch(erro => res.status(601).json({erro: erro}))
});

router.get('/persons/:id', function(req, res, next) {
  Person.getPerson(req.params.id)
  .then(dados => res.json(dados))
  .catch(erro => res.status(602).json({erro: erro}))
});

router.post('/persons', (req, res) => {
  Person.addPerson(req.body)
  .then(dados => res.status(201).json(dados))
  .catch(erro => res.status(603).json({erro: erro}))
});

router.put('/persons/:id', (req, res) => {
  Person.updatePerson(req.body)
  .then(dados => res.json(dados))
  .catch(erro => res.status(604).json({erro: erro}))
});

router.delete('/Persons/:id', (req, res) => {
  Person.deletePerson(req.params.id)
  .then(dados => res.json(dados))
  .catch(erro => res.status(605).json({erro: erro}))
});

module.exports = router;
