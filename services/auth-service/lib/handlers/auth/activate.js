const grpc = require('grpc')
const to = require('await-to-js').default

const ActivationToken = require('../../models/activation-token')

module.exports = async (call, cb) => {
  const data = call.request
  
  var [err, token] = await to(ActivationToken.findOneAndDelete({token: data.token}).populate('user').exec())
  if (err) return cb({code: grpc.status.INTERNAL, message: `ActivationToken.findOneAndDelete err: ${err}`})
  
  if (token === null)
    return cb({code: grpc.status.INVALID_ARGUMENT, message: 'Validation token is prolly already used / invalid'})
  
  var [err] = await to(token.user.update({activated: true}))
  if (err) return cb({code: grpc.status.INTERNAL, message: `User.update err: ${err}`})

  return cb(null)
}
