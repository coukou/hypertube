const grpc = require('grpc')
const to = require('await-to-js').default

const jwt = require('../../jwt')
const User = require('../../models/user')

module.exports = async (call, cb) => {
  const data = call.request

  var [err, user] = await to(User.findOne({username: data.username}).exec())
  if (err) return cb({code: grpc.status.INTERNAL, message: `User.findOne err: ${err}`})

  if (!user)
    return cb({code: grpc.status.PERMISSION_DENIED, message: 'username / password invalid'})

  // since oauth account are created with email in mind
  // i dont know if we should check this
  if (user.auth !== 'hypertube')
    return cb({code: grpc.status.PERMISSION_DENIED, message: `account created with ${user.auth} auth`})

  var [err, match] = await to(user.comparePassword(data.password))
  if (err) return cb({code: grpc.status.INTERNAL, message: `User.comparePassword`})
  
  if (!match)
    return cb({code: grpc.status.PERMISSION_DENIED, message: 'username / password invalid'})

  if (!user.activated)
    return cb({code: grpc.status.PERMISSION_DENIED, message: `You must validate your account`})

  var [err, token] = await to(jwt.sign(user))
  if (err) return cb({code: grpc.status.INTERNAL, message: `Unable to generate JWT token. please retry...`})
  
  cb(null, {token}) 
}
