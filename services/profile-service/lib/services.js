const path = require('path')
const grpc = require('grpc')

const authGuard = require('./interceptors/auth-guard')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/profile/profile.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const pb = grpc.loadPackageDefinition(pkgDef).hypertube.profile

module.exports = {
  profile: {
    service: pb.ProfileService.service,
    handlers: {
      profile: authGuard(require('./handlers/profile/profile')),
      myProfile: authGuard(require('./handlers/profile/my-profile')),
      edit: authGuard(require('./handlers/profile/edit'))
    }
  },
  internal: {
    service: pb.InternalProfileService.service,
    handlers: {
      updateAvatar: require('./handlers/internal/update-avatar'),
      authCreateProfile: require('./handlers/internal/auth-create-profile')
    }
  }
}
