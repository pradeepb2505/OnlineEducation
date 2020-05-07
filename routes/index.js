var express = require('express');
var router = express.Router();

var User = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Expresss'
  });
});

router.post('/checkuser', function (req, res, next) {
  // res.send('respond with a resource');
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body.username);
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (user) {
      res.json({
        found: true
      })
    } else {
      console.log(user);
      res.json({
        found: false
      });
    }
  });
});
router.post('/checkuser', function (req, res, next) {
  // res.send('respond with a resource');
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body.username);
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (user) {
      res.json({
        found: true
      })
    } else {
      console.log(user);
      res.json({
        found: false
      });
    }
  });
});

module.exports = router;