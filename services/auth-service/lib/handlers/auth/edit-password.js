const grpc = require('grpc')
const to = require('await-to-js').default

const mailgun = require('../../mailgun')
const User = require('../../models/user')
const RevokedToken = require('../../models/revoked-token')

module.exports = async (call, cb) => {
  const data = call.request
  if (!data.password || !data.password2)
    return cb({code: grpc.status.PERMISSION_DENIED, message: 'err.invalid_params'})
  
  // we retrieve user
  var [err, user] = await to(User.findOne({_id: data.jwt._id}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve user'})
 
  // here we check if user is not oauth user
  if (user.auth !== 'hypertube')
    return cb({code: grpc.status.PERMISSION_DENIED, message: `err.edit.oauth_user`})
 
  // we check if provided password match
  var [err, match] = await to(user.comparePassword(data.password2))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to compare password'})
  if (!match) return cb({code: grpc.status.PERMISSION_DENIED, message: 'err.invalid_pass'})

  // we update user with the new password
  user.password = data.password
  var [err] = await to(user.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to update user password'})

  // we revoke access token
  const rt = new RevokedToken({token: call.metadata.get('access-token')[0]})
  var [err] = await to(rt.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to revoke access-token'})

  cb(null)
}
