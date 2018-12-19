const grpc = require('grpc')
const to = require('await-to-js').default

const Profile = require('../../models/profile')

const isEmpty = (str) => str.trim().length === 0
const isAlpha = (str) => /^[a-zA-Z]+$/.test(str)

const validate = (data) => {
  const errors = []
  
  if (!data.first_name || isEmpty(data.first_name))
    errors.push({field: 'firstName', message: 'err.field.missing'})

  if (!data.last_name || isEmpty(data.last_name))
    errors.push({field: 'lastName', message: 'err.field.missing'})

  // if we got errors here no need to check special chars
  if (errors.length > 0)
    return errors

  if (!isAlpha(data.first_name))
    errors.push({field: 'firstName', message: 'err.field.alphanum'})

  if (!isAlpha(data.last_name))
    errors.push({field: 'lastName', message: 'err.field.alphanum'})
  
  // TODO: should check length ?
  return errors
}

module.exports = async (call, cb) => {
  const uid = call.request.jwt._id
  const data = call.request
  
  const errors = validate(data)
  if (errors.length !== 0)
    return cb({code: grpc.status.INVALID_ARGUMENT, message: JSON.stringify(errors)})

  var [err, profile] = await to(Profile.findOne({uid}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve user'})

  profile.last_name = data.last_name
  profile.first_name = data.first_name
  profile.inited = true

  var [err] = await to(profile.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: 'error while updating profile'})

  cb(null, profile)
}
