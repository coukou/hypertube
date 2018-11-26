const grpc = require('grpc')
const to = require('await-to-js').default

const mailgun = require('../../mailgun')
const User = require('../../models/user')
const ActivationToken = require('../../models/activation-token')

function validate(data) {
  return new Promise(async (resolve, reject) => {
    const validations = []

    if (!data.username.trim())
      validations.push({field: 'username', message: 'err.field.missing'})

    if (!data.password.trim())
      validations.push({field: 'password', message: 'err.field.missing'})
    
    if (!data.email.trim())
      validations.push({field: 'email', message: 'err.field.missing'})

    if (validations.length > 0)
      return resolve(validations)

    // username validation
    if (data.username.length < 4)
      validations.push({field: 'username', message: 'err.field.min-4'})

    if (data.username.length > 16)
      validations.push({field: 'username', message: 'err.field.max-16'})

    // username must be only alphanumerical
    if (/^[a-zA-Z0-9]+$/.test(data.username))
      validations.push({field: 'username', message: 'err.field.alphanum'})

    // password validation
    if (data.password.length < 4)
      validations.push({field: 'password', message: 'err.field.min-4'})

    // TODO: password strengh validation ???

    // email validation
    var [err, body] = await to(mailgun.validate(data.email))
    if (err) return reject(`mailgun.validate err: ${err}`)

    if (!body.is_valid)
      validations.push({field: 'email', message: 'err.field.invalid'})

    // if we already got error here, no need to check database duplicate entry
    if (validations.length > 0)
      return resolve(validations)

    // check if username / email already taken
    var [err, user] = await to(User.findOne({ $or: [{username: data.username}, {email: data.email}]}))
    if (err) return reject(`User.findOne err: ${err}`)

    if (user && user.username === data.username)
      validations.push({field: 'username', message: 'err.field.already-taken'})

    if (user && user.email === data.email)
      validations.push({field: 'email', message: 'err.field.already-taken'})

    return resolve(validations)
  })
}

module.exports = async (call, cb) => {
  const data = call.request

  var [err, validation] = await to(validate(data))
  if (err)
    return cb({code: grpc.status.INTERNAL, message: err})
  if (validation.length > 0)
    return cb({code: grpc.status.INVALID_ARGUMENT, message: JSON.stringify(validation)})

  var user = new User({
    username: data.username,
    password: data.password,
    email: data.email,
    activated: (process.env['AUTO_ACTIVATION'] === 'true') ? true : false
  })

  var [err, user] = await to(user.save())
  if (err) return cb({code: grpc.status.INTERNAL, message: `user.save err: ${err}`})

  if (process.env['AUTO_ACTIVATION'] !== 'true') {
    var [err, token] = await to((new ActivationToken({user})).save())
    if (err) return cb({code: grpc.status.INTERNAL, message: `ActivationToken.save err: ${err}`})

    var [err] = await to(mailgun.send(data.email, `Validation`, `validation link`))
    if (err) return cb({code: grpc.status.INTERNAL, message: `mailgun.send err: ${err}`})
  }

  return cb(null)
}
