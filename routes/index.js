var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /*
    For now, this will just redirect to your 
    graduation website. This can be changed 
    later to comment out the following line 
    and then add your own homepage for your
    website.
  */
  res.redirect('/grad');
});

module.exports = router;
