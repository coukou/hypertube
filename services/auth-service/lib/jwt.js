const jwt = require('jsonwebtoken')
const to = require('await-to-js').default

const RevokedToken = require('./models/revoked-token')

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'passphrase', async (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}
module.exports.verify = verify

module.exports.sign = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      iat: Math.floor(Date.now() / 1000) 
    }
    jwt.sign(payload, 'passphrase', (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

module.exports.isValid = (token) => {
  return new Promise(async (resolve, reject) => {
    var [err] = await to(verify(token))
    if (err) return resolve({valid: false, message: err.toString()})
    
    var [err, t] = await to(RevokedToken.findOne({token}))
    if (err) return reject('unable to check if token is revoked')
    if (t) return resolve({valid: false, message: 'token revoked'})
    resolve({valid: true})
  })
}

