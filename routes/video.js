var express = require('express');
var router = express.Router();
var context = {
  'title': 'Congrats Riya!',
  'video': true
};


router.get('/', function(req, res, next) {
  res.render('video', context);
});

module.exports = router;