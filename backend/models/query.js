const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
  name: {type: String, required: true},
  mobileNo: {type: String , required: true},
  emailId: {type: String , required: true},
  description: {type: String , required: true}
})

module.exports = mongoose.model("Query",querySchema);
