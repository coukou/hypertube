const grpc = require('grpc')
const to = require('await-to-js').default

const jwt = require('../../jwt')
const RevokedToken = require('../../models/revoked-token')

module.exports = async (call, cb) => {
  if (!call.request.token)
    return cb({code: grpc.status.INVALID_ARGUMENT, message: 'token is missing'})
  var [err, res] = await to(jwt.isValid(call.request.token))
  if (err) return cb({code: grpc.status.INTERNAL, message: err})
  cb(null, res)
}
