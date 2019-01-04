const grpc = require('grpc')
const to = require('await-to-js').default

const Anime = require('../../models/anime')
const Comment = require('../../models/comment')

module.exports = async (call, cb) => {
  const data = call.request

  // we first check anime exists
  var [err, anime] = await to(Anime.findOne({_id: data.anime}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve anime'})
  if (!anime) return cb({code: grpc.status.INVALID_ARGUMENTS, message: 'err.comment.anime_doesnt_exists'})
  
  // we check if episode exists too
  let exists = anime.episodes.findIndex(e => e.num === data.episode) >= 0
  if (!exists) return cb({code: grpc.status.INVALID_ARGUMENTS, message: 'err.comment.episode_doesnt_exists'})

  // we validate comment
  if (data.comment.trim().length === 0)
    return cb({code: grps.status.INVALID_ARGUMENTS, message: 'err.comment.empty'})

  if (data.comment.length > 200)
    return cb({code: grpc.status.INVALID_ARGUMENTS, message: 'err.comment.too_long'})

  const comment = new Comment({
    anime: data.anime,
    episode: data.episode,
    author: data.jwt._id,
    text: data.comment
  })

  var [err, com] = await to(comment.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'err.comment.unable_to_save'})

  return cb(null, com)
}
