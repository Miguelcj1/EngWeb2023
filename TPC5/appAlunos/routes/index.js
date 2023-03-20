var express = require('express');
var router = express.Router();
var Task = require('../controller/tasks')

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.taskList()
    .then(tasks => {
      res.render('index', { title: 'Gestor de Tarefas' , tasks: tasks});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tasks"})
    })
});

router.post('/', function(req, res, next) {
  Task.editTask(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tasks"})
    })
});

router.post('/editTask/:idTask', function(req, res, next) {
  Task.editTask(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tasks"})
    })
});

module.exports = router;
