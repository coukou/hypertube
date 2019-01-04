const path = require('path')
const grpc = require('grpc')
const jwtDecode = require('jwt-decode')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/auth/auth.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const AuthService = grpc.loadPackageDefinition(pkgDef).hypertube.auth.InternalAuthService
module.exports = new AuthService('192.168.99.100:31380', grpc.credentials.createInsecure())
