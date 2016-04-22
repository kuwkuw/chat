var express = require('express');
var router = express.Router();

/* GET users login form. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  var sess = req.session;
  sess.email = req.body.email;
   console.log('session', sess);
   console.log('logi', req.body);
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
