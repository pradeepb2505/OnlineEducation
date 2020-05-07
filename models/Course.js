var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  instructor: String,
  title: String,
  description: String,
  price: Number,
  image: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('course', CourseSchema);
