const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call) => {
  const data = call.request
  var [err, animes] = await to(Anime.find({title: {'$regex': data.name, '$options': '-i'}}).sort('title').limit(10).exec())
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
