const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call, cb) => {
  const data = call.request

  var [err, anime] = await to(Anime.findOne({title: data.title}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve anime'})
  if (anime) return cb(null, {anime_id: anime._id})

  anime = new Anime({
    title: data.title,
    synopsis: data.synopsis,
    thumbnail: data.thumbnail,
    rating: data.rating || 0
  })
  
  var [err, anime] = await to(anime.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to create anime'})
  return cb(null, {anime_id: anime._id})
}
