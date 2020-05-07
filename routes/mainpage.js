var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('mongodb+srv://admin:KtTTfwsYnUbD7uK@cluster0-qqyyu.mongodb.net/courses?retryWrites=true&w=majority');
var Course = require("../models/course");
var fs = require('fs');

var Cart = require('../models/cart');
var Course = require('../models/course');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    console.log("admin", req.user["admin"]);
    if(req.user["admin"]==true){
        res.render('adminmain', { title: 'WhiteBoard',
        title: 'NodeJS Shopping Cart',
<<<<<<< HEAD
		    products: products });
=======
        products: products });
>>>>>>> 99232a1734277a54a2add8611b0a8cf7d39021c5
    }
    else{
      console.log(products)
      res.render('usermain', 
      { 
        title: 'NodeJS Shopping Cart',
        products: products,
        session:req.session
      }
      );
    }
});

router.get('/mycourses', function (req, res, next) {
  res.render('mycourses',{title:"WhiteBoard"});
});

router.get('/addcourse', function (req, res, next) {
  res.render('addcourse',{title:"WhiteBoard"});
});

router.post('/addcourse', function (req, res, next) {
  var course = new Course(req.body);
  // res.json(req.body);

  course.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/courses/create");
    } else {
      console.log("Successfully created an courses.");
      res.redirect('/main');
    }
  });
  
});

<<<<<<< HEAD


=======
>>>>>>> 99232a1734277a54a2add8611b0a8cf7d39021c5
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
    username: req.user.username,
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  }, function(err, myCourses){
    if (err) throw err;
    res.json(myCourses);
  });
});




module.exports = router;
