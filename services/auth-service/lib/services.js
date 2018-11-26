const path = require('path')
const grpc = require('grpc')

const authGuard = require('./interceptors/auth-guard')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/auth/auth.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const pb = grpc.loadPackageDefinition(pkgDef).hypertube.auth

module.exports = {
  auth: {
    service: pb.AuthService.service,
    handlers: {
      register: require('./handlers/auth/register'),
      logout: require('./handlers/auth/logout'),
      reset: require('./handlers/auth/reset'),
      activate: require('./handlers/auth/activate'),
      editEmail: authGuard(require('./handlers/auth/edit-email')),
      auth: require('./handlers/auth/auth'),
      oauth42: require('./handlers/auth/oauth-42'),
      oauthGithub: require('./handlers/auth/oauth-github')
    }
  },
  internal: {
    service: pb.InternalAuthService.service,
    handlers: {
      tokenIsValid: require('./handlers/internal/token-is-valid')
    }
  }
}
