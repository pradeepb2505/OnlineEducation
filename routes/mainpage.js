var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const path = require("path");
const multer = require('multer');
const upload = multer({dest:__dirname+'\\..\\public\\images\\a'});

var monk = require('monk');
var db = monk('mongodb+srv://admin:KtTTfwsYnUbD7uK@cluster0-qqyyu.mongodb.net/whiteBoard?retryWrites=true&w=majority');
var Course = require("../models/course");
var fs = require('fs');

var Cart = require('../models/cart');
// var Course = require('../models/course');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.post('/addcourse',  upload.single('photo'), function (req, res) {
  req.body.image = req.file.originalname;
  console.log(req.file)
  var course = new Course(req.body);
  // res.json(req.body);
  fs.rename(req.file.path, __dirname+'\\..\\public\\images\\'+req.file.originalname, err =>{

  });
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

router.get('/delete/:id',  upload.single('photo'), function (req, res) {
  Course.deleteOne({ _id:req.params.id }, function (err) {
    if (err) return handleError(err);
    res.redirect("/main");
  });
});

router.post('/upload', upload.single('photo'), (req, res) => {
  console.log(path.__dirname);
  fs.rename(__dirname+'\\..\\public\\images\\temp.png', __dirname+'\\..\\public\\images\\'+req.file.originalname, err =>{

  });
  if(req.file) {
      res.json(req.file);
  }
  else throw 'error';
});

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log(req.user);
    console.log("admin", req.user["admin"]);
   
    if(req.user["admin"]==true){
      Course.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.render('adminmain', { title: 'WhiteBoard',
          title: 'NodeJS Shopping Cart',
          products: result });
        }
      });
       
    }
    else{
      //console.log(products)

      var collection = db.get('myCourses');
      collection.find({username: req.user.username}, function(err,mycourses) {
            console.log(mycourses);
            if (err) {
              console.log(err);
            } else {
              res.render('mycourses', { title: 'WhiteBoard',
              title: 'NodeJS Shopping Cart',
              mycourses: mycourses,
              user: req.user
              });
            }
      });
      
    }
});

router.get('/shopcourses', function (req, res, next) {
  Course.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result)
          res.render('usermain', { title: 'WhiteBoard',
          title: 'NodeJS Shopping Cart',
          products: result,
          session:req.session });
        }
      });
});

router.get('/addcourse', function (req, res, next) {
  res.render('addcourse',{title:"WhiteBoard"});
});

router.get('/edit/:id', function(req, res, next) {
  console.log(req.params.id);
  Course.find({_id:req.params.id}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.render('editcourse', { title: 'WhiteBoard',
      title: 'NodeJS Shopping Cart',
      product: result[0] });
    }
  });
});

router.post('/updatecourse/:id', function(req, res, next){
  upd = req.body
  Course.findOneAndUpdate({_id:req.params.id},upd, function(err, user){

      res.redirect("/main");
  });
})






router.get('/add/:id', function(req, res, next) {


  Course.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          var productId = req.params.id;
          var cart = new Cart(req.session.cart ? req.session.cart : {});
          var product = result.filter(function(item) {
            return item.id == productId;
          });
          cart.add(product[0], productId);
          req.session.cart = cart;
          res.redirect('/main/shopcourses');
        }
      });
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



=======

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Expresss' });
});

>>>>>>> master
module.exports = router;
