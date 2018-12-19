const grpc = require('grpc')
const to = require('await-to-js').default

const mailgun = require('../../mailgun')
const User = require('../../models/user')
const RevokedToken = require('../../models/revoked-token')

module.exports = async (call, cb) => {
  const data = call.request
  if (!data.email, !data.password)
    return cb({code: grpc.status.INVALID_ARGUMENT, message: 'err.invalid_params'})

  // check if wanted email is not the current email
  if (data.email === data.jwt.email)
    return cb({code: grpc.status.INVALID_ARGUMENT, message: 'seriously ??'})
  
  // we retrieve user
  var [err, user] = await to(User.findOne({email: data.jwt.email}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve user'})
 
  // here we check if user is not oauth user
  if (user.auth !== 'hypertube')
    return cb({code: grpc.status.PERMISSION_DENIED, message: `you can't change email when account is created with oauth`})
 
  // we check if wanted email is already in use
  var [err, exists] = await to(User.findOne({email: data.email}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to check if email is already in use'})
  if (exists) return cb({code: grpc.status.INVALID_ARGUMENT, message: 'err.email_already_use'})

  // we check if provided password match
  var [err, match] = await to(user.comparePassword(data.password))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to compare password'})
  if (!match) return cb({code: grpc.status.PERMISSION_DENIED, message: 'err.invalid_pass'})

  // we validate wanted email
  var [err, body] = await to(mailgun.validate(data.email))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to check email validity'})
  if (!body.is_valid) return cb({code: grpc.status.INVALID_ARGUMENT, message: 'err.email_invalid'})

  // we update user with the new email
  user.email = data.email
  var [err] = await to(user.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to update user email'})

  // we revoke access token
  const rt = new RevokedToken({token: call.metadata.get('access-token')[0]})
  var [err] = await to(rt.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to revoke access-token'})

  cb(null)
}
