const mongoose = require('mongoose');

const uniqueValidator =require('mongoose-unique-validator');

const querySchema = mongoose.Schema({
  title: {type: String , required: true, unique: true},
  description: {type: String , required: true},
  path: {type: String, required: true},
})

querySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Slide",querySchema);
