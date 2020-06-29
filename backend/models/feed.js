const mongoose = require("mongoose");

const uniqueValidator =require('mongoose-unique-validator');

const feedSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  path: {type: String, required: true}
})

feedSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Feed",feedSchema);
