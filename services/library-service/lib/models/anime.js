const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  synopsis: {type: String, required: true},
  thumbnail: {type: String, required: true},
  rating: {type: Number},
  episodes: [{
    num: {type: String},
    date: {type: Number},
    qualities: [{
      quality: {type: String},
      magnet: {type: String}
    }]
  }],
})

module.exports = mongoose.model('anime', schema)
