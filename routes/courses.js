var express = require('express');
var router = express.Router();
var courses = require("../controllers/coursesController.js");

// Get all employees
router.get('/', function(req, res) {
  courses.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
  courses.show(req, res);
});

// Create employee
router.get('/create', function(req, res) {
  courses.create(req, res);
});

// Save employee
router.post('/save', function(req, res) {
  courses.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
  courses.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  courses.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  courses.delete(req, res);
});

module.exports = router;
