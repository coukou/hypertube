const grpc = require('grpc')
const to = require('await-to-js').default

const Profile = require('../../models/profile')

module.exports = async (call, cb) => {
  const uid = call.request.jwt._id
  if (!uid)
    return cb({code: grpc.status.INVALID_ARGUMENT, message: 'invalid params'})
  var [err, profile] = await to(Profile.findOne({uid}))
  if (err)
    return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve profile'})

  // if the profile doesnt exists we create him
  if (!profile) {
    var [err, profile] = await to((new Profile({uid}).save()))
    if (err) return cb({code: grpc.status.INTERNAL, message: 'please retry'})
  }
  cb(null, profile)
}
