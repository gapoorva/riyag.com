var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var context = {
    'title': 'Congrats Riya!',
    'timeline': true,
    'events' : [
      {
        'eventTitle': 'Riya\'s Grad Party',
        'eventImage': 'assets/events/event-00.jpg',
        'eventDescription': '<p>Riya\'s parents, brother, dog, and family all helped to host a grad party for her at <a href="">Rochester Community House</a>. To celebrate her accomplishments, gathered to congratulate the new graduate and share some good food. Some of her family even flew across the world to be there.</p><p>We all wish you the very best luck as you continue your journey onwards towards new adventures at the University of Michigan. Go Blue!</p>' ,
        'eventDateDescription': 'Sunday, May 28th'
      }
    ]
  }
  res.render('grad', context);
});

module.exports = router;
