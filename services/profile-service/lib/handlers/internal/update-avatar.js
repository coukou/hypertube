const grpc = require('grpc')
const to = require('await-to-js').default
const Profile = require('../../models/profile')

module.exports = async (call, cb) => {
  const data = call.request
  var [err, profile] = await to(Profile.findOne({uid: data.id}))
  if (err) return cb({code: grpc.status.INTERNAL, message: "unable to retrieve profile"})
  if (!profile) return cb({code: grpc.status.NOT_FOUND, message: "profile not found"})

  profile.avatar = data.avatar
  var [err] = await to(profile.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to update profile'})
  cb(null)
}
