const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  token: { type: String }
})

module.exports = mongoose.model('RevokedToken', schema)
