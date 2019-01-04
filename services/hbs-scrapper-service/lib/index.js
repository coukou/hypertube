const Queue = require('better-queue')

const api = require('./api')
const library = require('./library-service')

const QUEUE_OPTS = {
  concurrent: 100,
  afterProcessDelay: 100,
}

const addEpisodeQueue = new Queue(function ({anime, episode}, cb) {
  const params = {
    anime_id: anime.id,
    num: episode.number,
    date: (new Date(episode.date)).getTime() / 1000,
    qualities: episode.qualities
  }
  library.addAnimeEpisode(params, (err, res) => {
    if (err) return console.log(`error adding episode ${anime.title}:${episode.number}:`, err)
    console.log(`Episode: ${anime.title}:${episode.number} added`)
    cb()
  }) 
}, QUEUE_OPTS)

const retrieveEpisodesQueue = new Queue(function (anime, cb) {
  api.getAnimeEpisodes(anime.details.id).then(episodes => {
    for (let episode of episodes) {
      addEpisodeQueue.push({anime, episode})
    }
    cb()
  })
}, QUEUE_OPTS)

const addAnimeQueue = new Queue(function (anime, cb) {
  api.getAnimeDetails(anime).then(details => {
    // if thumbnail or synopsis missing we skip anime
    if (!details.synopsis || !details.thumbnail || !details.popularity) {
      return cb()
    }
    const params = {
      title: anime.title,
      synopsis: details.synopsis,
      thumbnail: details.thumbnail,
      popularity: details.popularity
    }
    library.addAnime(params, (err, res) => {
      if (err) return console.log(`Error adding anime: ${anime.title}:`, err)
      console.log(`Anime: ${anime.title} added`)
      anime.id = res.anime_id
      anime.details = details
      retrieveEpisodesQueue.push(anime)
      cb()
    })
  })
}, QUEUE_OPTS)

api.getAnimes().then(animes => {
  animes.forEach(anime => addAnimeQueue.push(anime))
})

