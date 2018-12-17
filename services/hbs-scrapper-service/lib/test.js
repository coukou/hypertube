
const api = require('./api')
api.getAnimes().then(animes => {
  animes.forEach(anime => {
    if (anime.title !== '100% Pascal-sensei')
      return
    api.getAnimeDetails(anime).then(details => {
      api.getAnimeEpisodes(details.id).then(episodes => {
        console.log(episodes)
      })
    })
  })
})

