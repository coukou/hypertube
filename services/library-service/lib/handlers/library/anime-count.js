const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call, cb) => {
  var [err, count] = await to(Anime.count({
    episodes: { $exists: true }, $where: 'this.episodes.length > 0'
  }).exec())
  if (err) return cb({code: grpc.status.INTERNAL, message: "unable to count animes"})
  return cb(null, {count})
}
