var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('mongodb+srv://admin:KtTTfwsYnUbD7uK@cluster0-qqyyu.mongodb.net/courses?retryWrites=true&w=majority');

router.get('/', function(req, res){
  //console.log("hi")
  var collection = db.get('myCourses');
  console.log("hi")
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  collection.insert({
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  }, function(err, myCourses){
    if (err) throw err;
    res.json(myCourses);
  });
});


module.exports = router;