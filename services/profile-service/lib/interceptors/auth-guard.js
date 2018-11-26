const path = require('path')
const grpc = require('grpc')
const jwtDecode = require('jwt-decode')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../../protos/auth/auth.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const AuthService = grpc.loadPackageDefinition(pkgDef).hypertube.auth.InternalAuthService
const authClient = new AuthService('auth-service:3000', grpc.credentials.createInsecure())

module.exports = (next) => {
  return (call, cb) => {
    const [token] = call.metadata.get('access-token')
    if (!token)
        return cb({code: grpc.status.PERMISSION_DENIED, message: 'metadata[access-token] is missing'})
    authClient.tokenIsValid({token}, (err, res) => {
      if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to check token validity'})
      if (!res.valid)
        return cb({code: grpc.status.PERMISSION_DENIED, message: 'provided token is invalid / revoked'})
      call.request.jwt = jwtDecode(token)
      next(call, cb)
    })
  }
}
