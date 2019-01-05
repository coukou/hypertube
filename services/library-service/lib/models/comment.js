const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  anime: { type: String },
  episode: { type: String },
  author: { type: String },
  text: { type: String },
  date: { type: Number }
})

module.exports = mongoose.model('comment', schema)
