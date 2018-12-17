const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call, cb) => {
  const data = call.request

  var [err, anime] = await to(Anime.findOne({qualities: {_id: data.id}}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve anime'})
  if (!anime) return cb({code: grpc.status.NOT_FOUND, message: 'not found'})
  cb(null, {torrent: anime.torrent})
}
