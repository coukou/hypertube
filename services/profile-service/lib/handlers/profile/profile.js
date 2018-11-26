const grpc = require('grpc')
const mongoose = require('mongoose');
const to = require('await-to-js').default

const Profile = require('../../models/profile')

module.exports = async (call, cb) => {
  const _id = call.request.id
  if (!_id || !mongoose.Types.ObjectId.isValid(_id))
    return cb({code: grpc.status.INVALID_ARGUMENT, message: 'invalid params'})
  var [err, profile] = await to(Profile.findOne({_id}))
  if (err)
    return cb({code: grpc.status.INTERNAL, message: `unable to retrieve profile: ${err}`})
  if (!profile)
    return cb({code: grpc.status.NOT_FOUND, message: 'profile doesnt exists'})
  cb(null, profile)
}
