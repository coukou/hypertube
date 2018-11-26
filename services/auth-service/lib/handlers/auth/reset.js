const grpc = require('grpc')
const to = require('await-to-js').default

const User = require('../../models/user')
const mailgun = require('../../mailgun')

module.exports = async (call, cb) => {
  // we retrieve user with given username
  var [err, user] = await to(User.findOne({username: call.request.username}))
  if (err) return cb({code: grpc.status.INTERNAL, message: `User.findOne err: ${err}`})
  if (!user) return cb(null)
  if (user.auth) return cb({code: grpc.status.INVALID_ARGUMENT, message: `user created with oauth`})

  // we change password here
  const password = [...Array(32)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
  user.password = password
  var [err, user] = await to(user.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: `reset: user.save err: ${err}`})
 
  // we send email with the new password
  var [err] = await to(mailgun.send(user.email, 'Password reset', `Your new password is ${password}`))
  if (err) return cb({code: grpc.status.INTERNAL, message: `reset: mailgun.send err: ${err}`})

  cb(null)
}
