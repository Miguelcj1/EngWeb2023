var express = require('express');
var router = express.Router();
var Exames = require("../controllers/exames")


router.get('/api/emd', function (req, res, next) {
  if(req.query){
      if(req.query.modalidade){
          Exames.modalidadesArg(req.query.modalidade)
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }else if(req.query.res && req.query.res == "OK"){
          Exames.resOK()
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }
  }else{
      Exames.list()
      .then((result) => {
          res.jsonp(result);
      }).catch((err) => {
          res.jsonp(err);
      });
  }
});

router.get('/api/emd/:id', function(req, res, next) {
  Exames.getExames(req.params.id)
    .then(exames => {
      res.jsonp(exames)
    })
    .catch(erro => {
      res.jsonp(erro);
    })
});

router.get('/api/modalidades', function(req, res, next) {
  Exames.modalidades()
    .then(exames => {
      res.jsonp(exames)
    })
    .catch(erro => {
      res.jsonp(erro);
    })
});

router.get('/api/atletas', function (req, res, next) {
  if(req.query){
      if(req.query.gen){
          Exames.examesGen(req.query.gen)
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }else if(req.query.clube){
          Exames.examesAtletasClube(req.query.clube)
          .then((result) => {
              res.jsonp(result);
          }).catch((err) => {
              res.jsonp(err);
          });
      }
  }
});



module.exports = router;
