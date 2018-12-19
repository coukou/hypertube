const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')

module.exports = async (call, cb) => {
  const id = call.request.id;
  if (!id) return cb({code: grpc.status.INVALID_ARGUMENT, message: "rip"})
  var [err, anime] = await to(Anime.findOne({_id: id}))
  if (err) return cb({code: grpc.status.INTERNAL, message: "unable to retrieve anime"})
  return cb(null, anime)
}
