var mongoose = require("mongoose");
var Course = require("../models/Course");

var coursesController = {};

// Show list of employees
coursesController.list = function(_req, res) {
  Course.find({}).exec(function (err, courses) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/courses/index", {courses: courses});
    }
  });
};

// Show employee by id
coursesController.show = function(req, res) {
  Course.findOne({_id: req.params.id}).exec(function (err, courses) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/courses/show", {courses: courses});
    }
  });
};

// Create new employee
coursesController.create = function(_req, res) {
  res.render("../views/courses/create");
};

// Save new employee
coursesController.save = function(req, res) {
 
  var course = new Course(req.body);
  // res.json(req.body);

  course.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/courses/create");
    } else {
      console.log("Successfully created an courses.");
      res.redirect("/courses/show/"+course._id);
    }
  });
};

// Edit an employee
coursesController.edit = function(req, res) {
  Course.findOne({_id: req.params.id}).exec(function (err, course) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/courses/edit", {course: course});
    }
  });
};

// Update an employee
coursesController.update = function(req, res) {
  Course.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, description: req.body.description, instructor: req.body.instructor }}, { new: true }, function (err, _employee) {
    if (err) {
      console.log(err);
      res.render("../views/courses/edit", {courses: req.body});
    }
    res.redirect("/courses");
  });
};

// Delete an employee
coursesController.delete = function(req, res) {
  Course.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("courses deleted!");
      res.redirect("/courses");
    }
  });
};

module.exports = coursesController;
