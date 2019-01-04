const Queue = require('better-queue')

const api = require('./api')
const library = require('./library-service')

const cache = {}

const QUEUE_OPTS = {
  concurent: 100,
  afterProcessDelay: 100
}

const addEpisodeQueue = new Queue(function ({anime, episode}, cb) {
  Promise.all(
    episode.qualities.map(q => api.getMagnet(q).then(magnet => {
      q.magnet = magnet
    }))
  ).then(() => {
    const params = {
      anime_id: anime.id,
      num: episode.num,
      qualities: episode.qualities
    }
    library.addAnimeEpisode(params, (err, res) => {
      if (err) return cb();
      console.log(`Episode: ${anime.title}:${episode.num} added`)
      cb()
    })
  })
})

const addAnimeQueue = new Queue(function (anime, cb) {
  api.getAnimeDetails(anime).then(details => {
    // if thumbnail or synopsis missing we skip anime
    if (!details.synopsis || !details.thumbnail || !details.popularity) {
      return cb()
    }
    const params = {
      title: anime,
      synopsis: details.synopsis,
      thumbnail: details.thumbnail,
      popularity: details.popularity
    }
    library.addAnime(params, (err, res) => {
      if (err) return cb();
      console.log(`Anime: ${anime} added`)
      const episodes = cache.animes[anime]
      Object.keys(episodes).forEach(k => {
        const episode = episodes[k]
        episode.num = k
        addEpisodeQueue.push({
          episode,
          anime: {
            id: res.anime_id,
            title: anime
          },
        })
      })
      cb()
    })
  })
}, QUEUE_OPTS)

api.getAnimes({concurent: 10, page: 120}).then(animes => {
  cache.animes = animes
  Object.keys(animes).forEach(anime => {
    addAnimeQueue.push(anime)
  })
})
