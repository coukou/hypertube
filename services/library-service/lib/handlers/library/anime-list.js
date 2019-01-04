const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call) => {
  const data = call.request

  data.offset = Math.max(data.offset || 0, 0)
  data.limit = Math.min(data.limit || 20, 20)

  var [err, animes] = await to(Anime.find({
    episodes: { $exists: true }, $where: 'this.episodes.length > 0'
  }).sort('popularity').skip(data.offset).limit(data.limit).exec())
  if (err) return call.end()

  for (let anime of animes) { 
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
  }
  call.end()
}
