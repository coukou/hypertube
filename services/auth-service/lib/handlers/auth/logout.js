const grpc = require('grpc')
const to = require('await-to-js').default

const jwt = require('../../jwt')
const RevokedToken = require('../../models/revoked-token')

module.exports = async (call, cb) => {
  const [ token ] = call.metadata.get('access-token')
  var [err] = await to(jwt.verify(token))
  if (err) return cb(null)

  var [err, t] = await to(RevokedToken.findOne({token}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to revoke your token please retry #1'})
  if (t) return cb(null)

  var [err] = await to((new RevokedToken({token})).save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to revoke your token please retry #2'})
  return cb(null)
}
