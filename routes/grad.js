var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  res.render('index', {'title': 'Riya\'s Graduation'})
});

module.exports = router;
