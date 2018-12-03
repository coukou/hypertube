const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call, cb) => {
  const data = call.request

  var [err, anime] = await to(Anime.findOne({_id: data.anime_id}))
  if (err) return cb({code: grpc.status.INTERNAL, message: `unable to retrieve anime with id: ${data.anime_id}`})
  if (!anime) return cb({code: grpc.status.INTERNAL, message: `anime with id: ${data.anime_id} doesnt exists`})

  if (anime.episodes.findIndex(e => e.num === data.num) > -1) {
    return cb(null)
  }
  
  anime.episodes.push({
    num: data.num,
    date: data.date,
    qualities: data.qualities
  })
  var [err, anime] = await to(anime.save())
  if (err) return cb({code: grpc.code.INTERNAL, message: `unable to add anime epsiode`})
  cb(null)
}
