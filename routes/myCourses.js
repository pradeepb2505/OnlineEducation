var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('mongodb+srv://admin:KtTTfwsYnUbD7uK@cluster0-qqyyu.mongodb.net/courses?retryWrites=true&w=majority');
router.get('/', function(req, res) {
	var collection = db.get('myCourses');
	collection.find({}, function(err, myCourses){
		if (err) throw err;
	  	res.json(myCourses);
	});
});
router.post('/', function(req, res){
	var collection = db.get('myCourses');
	collection.insert({
		courseName: req.body.courseName
	}, function(err, myCourses){
		if (err) throw err;
		res.json(myCourses);
	});
});
module.exports = router;