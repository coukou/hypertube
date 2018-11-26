const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  token: { type: String }
})

schema.pre('save', async function (next) {
  this.token = [...Array(32)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
  this.token = encodeURI(this.token)
  next()
})

module.exports = mongoose.model('ActivationToken', schema)
