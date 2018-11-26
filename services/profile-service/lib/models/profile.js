const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  uid: {type: String},
  last_name: {type: String},
  first_name: {type: String},
  avatar: {type: String},
  inited: {type: Boolean, default: false}
})

module.exports = mongoose.model('profile', schema)
