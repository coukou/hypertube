const path = require('path')
const grpc = require('grpc')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/profile/profile.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const ProfileService = grpc.loadPackageDefinition(pkgDef).hypertube.profile.InternalProfileService
module.exports = new ProfileService('profile-service:3000', grpc.credentials.createInsecure())

