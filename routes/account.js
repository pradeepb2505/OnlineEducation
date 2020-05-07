var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('account', { title: 'Expresss' });
    User.findOne({_id:req.user._id},function(err, user){
        res.render('account', { title: 'Expresss', user:user  });
    });
});

router.post('/updateUser', function(req, res, next){
    upd = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email
    }
    User.findOneAndUpdate({_id:req.user._id},upd, function(err, user){

        res.redirect("/account");
    });
})

module.exports = router;
