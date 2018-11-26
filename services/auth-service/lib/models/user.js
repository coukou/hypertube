const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const to = require('await-to-js').default

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  activated: { type: Boolean, default: false },
  auth: { type: String, default: 'hypertube' }
})

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  var [err, salt] = await to(bcrypt.genSalt(10))
  if (err) return next(err)

  var [err, hash] = await to(bcrypt.hash(this.password, salt))
  if (err) return next(err)

  this.password = hash
  next()
})

schema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, match) => {
      if (err) return reject(err)
      resolve(match)
    })
  })
}

module.exports = mongoose.model('User', schema)
