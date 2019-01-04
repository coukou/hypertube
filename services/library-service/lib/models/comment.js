const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  anime: { type: String },
  episode: { type: String },
  author: { type: String },
  text: { type: String },
})

module.exports = mongoose.model('comment', schema)
