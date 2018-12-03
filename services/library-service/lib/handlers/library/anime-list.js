const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call) => {
  const data = call.request

  data.offset = Math.max(data.offset || 0, 0)
  data.limit = Math.min(data.limit || 20, 20)

  var [err, animes] = await to(Anime.find().sort('title').skip(data.offset).limit(data.limit).exec())
  if (err) return call.end()
  animes.forEach((anime, i) => {
    call.write({
      id: anime._id,
      title: anime.title,
      synopsis: anime.synopsis,
      thumbnail: anime.thumbnail,
      episodes: anime.episodes.map(e => ({
        num: e.num,
        date: e.date,
        qualities: e.qualities.map(q => q.quality)
      }))
    })
    if (i === animes.length - 1)
      return call.end()
  })
}
