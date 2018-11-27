const path = require('path')
const grpc = require('grpc')

const authGuard = require('./interceptors/auth-guard')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/movie/movie.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const pb = grpc.loadPackageDefinition(pkgDef).hypertube.movie

module.exports = {
  movie: {
    service: pb.MovieService.service,
    handlers: {
      list: require('./handlers/movie/list')
    }
  },
  internal: {
    service: pb.InternalMovieService.service,
    handlers: {
      add: require('./handlers/internal/add')
    }
  }
}
