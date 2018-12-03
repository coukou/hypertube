const path = require('path')
const grpc = require('grpc')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/library/library.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const LibraryService = grpc.loadPackageDefinition(pkgDef).hypertube.library.InternalLibraryService
const libraryClient = new LibraryService('192.168.99.100:31380', grpc.credentials.createInsecure())

module.exports = libraryClient
