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
      getAnime: authGuard(require('./handlers/library/get-anime')),
      searchAnime: authGuard(require('./handlers/library/search-anime')),
      animeList: authGuard(require('./handlers/library/anime-list')),
      animeCount: authGuard(require('./handlers/library/anime-count')),
      commentList: authGuard(require('./handlers/library/comment-list')),
      commentEpisode: authGuard(require('./handlers/library/comment-episode')),
      getAnimeTorrent: require('./handlers/library/get-anime-torrent')
    }
  },
  internal: {
    service: pb.InternalLibraryService.service,
    handlers: {
      addAnime: require('./handlers/internal/add-anime'),
      addAnimeEpisode: require('./handlers/internal/add-anime-episode'),
    }
  }
}
