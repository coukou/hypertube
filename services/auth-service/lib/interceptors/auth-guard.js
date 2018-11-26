const grpc = require('grpc')
const to = require('await-to-js').default
const jwtDecode = require('jwt-decode');

const jwt = require('../jwt')
const RevokedToken = require('../models/revoked-token')

module.exports = (next) => {
  return async (call, cb) => {
    const [ token ] = call.metadata.get('access-token')
    if (!token)
      return cb({code: grpc.status.PERMISSION_DENIED, message: 'metadata[access-token] is missing'})
    var [err, res] = await to(jwt.isValid(token))
    if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to check access-token'})
    if (!res.valid) return cb({code: grpc.status.PERMISSION_DENIED, message: 'access-token invalid / revoked'})

    call.request.jwt = jwtDecode(token)
    next(call, cb)
  }
}
