const path = require('path')
const grpc = require('grpc')

const authGuard = require('./interceptors/auth-guard')

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/library/library.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const pb = grpc.loadPackageDefinition(pkgDef).hypertube.library

module.exports = {
  library: {
    service: pb.LibraryService.service,
    handlers: {
      getAnime: require('./handlers/library/get-anime'),
      animeList: require('./handlers/library/anime-list'),
    }
  },
  internal: {
    service: pb.InternalLibraryService.service,
    handlers: {
      addAnime: require('./handlers/internal/add-anime'),
      addAnimeEpisode: require('./handlers/internal/add-anime-episode'),
      getAnimeTorrent: require('./handlers/internal/get-anime-torrent'),
      //getMovieTorrent: require('./handlers/internal/get-movie-torrent')
    }
  }
}
