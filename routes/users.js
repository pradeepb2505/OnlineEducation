var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var authenticate = require('../authenticate');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  console.log(passport.authenticate);
});

router.post('/signup', (req, res, next) => {
  console.log(req.body.username);
  User.register(new User({
      username: req.body.username,
      email: req.body.email
    }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          err: err
        });
        console.log(user);
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: true,
            status: 'Registration Successful!'
          });
        });
      }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    status: 'You are successfully logged in!'
  });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});



module.exports = router;