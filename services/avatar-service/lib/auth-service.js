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

const AuthService = grpc.loadPackageDefinition(pkgDef).hypertube.auth.AuthService
module.exports = new AuthService('auth-service:3000', grpc.credentials.createInsecure())
