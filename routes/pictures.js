var express = require('express');
var router = express.Router();
var glob = require('glob');
var images = [];

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
}

glob('*.{jpg,JPG,png,PNG}', {'cwd':'./public/assets/photos'}, function(er, files) {
  if (er) console.log(er);
  else {
    // create 3 subarrays in images
    images.push([]);
    images.push([]);
    images.push([]);
    shuffle(files);
    for(var i = 0; i < files.length; i++) {
      images[i%3].push('assets/photos/'+files[i]);
    }
  }
  // reordering?
});


router.get('/', function(req, res, next) {
  var context = {
    'title': 'Congrats Riya!',
    'pictures': true,
    'env': req.app.get('env'),
    'images': images
  };
  res.render('pictures', context);
});
module.exports = router;