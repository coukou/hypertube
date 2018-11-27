const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  thumbnail: {type: String, required: true},
  year: {type: Number, required: true},
  author: {type: String, required: true},
  synopsis: {type: String, required: true},
  genres: [String],
  actors: [String],
  ratings: {type: Number}
})

module.exports = mongoose.model('movie', schema)
