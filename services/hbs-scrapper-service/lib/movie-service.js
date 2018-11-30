const grpc = require('grpc')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../../protos/movie/movie.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const MovieService = grpc.loadPackageDefinition(pkgDef).hypertube.movie.InternalMovieService
const movieClient = new AuthService('movie-service:3000', grpc.credentials.createInsecure())

module.exports = movieClient
