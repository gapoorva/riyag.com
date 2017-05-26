var express = require('express');
var router = express.Router();
var context = require('./timeline-info');

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('grad', context);
});

module.exports = router;
