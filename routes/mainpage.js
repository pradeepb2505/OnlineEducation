var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('mongodb+srv://admin:KtTTfwsYnUbD7uK@cluster0-qqyyu.mongodb.net/courses?retryWrites=true&w=majority');

var fs = require('fs');

var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    console.log("admin", req.user["admin"]);
    if(req.user["admin"]==true){
        res.render('adminmain', { title: 'WhiteBoard' });
    }
    else{
    	console.log(products)
		  res.render('usermain', 
		  { 
		    title: 'NodeJS Shopping Cart',
		    products: products
		  }
		  );
    }
});
router.get('/add/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/main');
});

router.get('/cart', function(req, res, next) {
  console.log("hi")
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});


router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/main/cart');
});

router.get('/checkout', function(req, res){
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
