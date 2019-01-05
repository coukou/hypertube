const grpc = require('grpc')
const to = require('await-to-js').default

const Comment = require('../../models/comment')

module.exports = async (call) => {
  const data = call.request
  var [err, comments] = await to(Comment.find({anime: data.anime, episode: data.episode}))
  
  for (let comment of comments) {
    call.write({
      author: comment.author,
      text: comment.text,
      date: comment.date
    })
  }
  call.end()
}
