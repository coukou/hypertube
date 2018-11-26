const grpc = require('grpc')
const to = require('await-to-js').default

const Profile = require('../../models/profile')

module.exports = async (call, cb) => {
  const { first_name, last_name, avatar } = call.request
  const uid = call.request.id

  var [err, profile] = await to(Profile.findOne({uid}))
  if (err)
    return cb({code: grpc.status.INTERNAL, message: 'unable to check profile duplication'})
  if (profile)
    return cb(null)

  profile = new Profile({
    uid,
    first_name,
    last_name,
    avatar
  })
  var [err] = await to(profile.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: `unlucky...`})
  cb(null)
}
