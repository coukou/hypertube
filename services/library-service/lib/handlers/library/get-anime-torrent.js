const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call, cb) => {
  const data = call.request

  var [err, anime] = await to(Anime.findOne({_id: data.anime}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve anime'})
  if (!anime) return cb({code: grpc.status.NOT_FOUND, message: 'anime not found'})

  const episode = anime.episodes.find(e => e.num === data.episode)
  if (!episode) return cb({code: grpc.status.NOT_FOUND, message: 'episode not found'})
  
  const quality = episode.qualities.find(q => q.quality === data.quality)
  if (!quality) return cb({code: grpc.status.NOT_FOUND, message: 'quality not found'})

  cb(null, {magnet: quality.magnet})
}
