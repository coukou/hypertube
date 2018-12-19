const grpc = require('grpc')
const request = require('request-promise')
const to = require('await-to-js').default

const jwt = require('../../jwt')
const User = require('../../models/user')
const ProfileClient = require('../../profile-client')

const codeToToken = (code) => {
  return new Promise(async (resolve, reject) => {
    var [err, res] = await to(request({
      method: 'POST',
      uri: 'https://api.intra.42.fr/oauth/token',
      body: {
        grant_type: 'authorization_code',
        client_id: '916b137155359d60f07ad232302d09674851ca9ed68041fbaf5afcfa72135d84',
        client_secret: 'eae9d95f4d70394708726af7b270b37b5ee8a952934b558b4eec45a8d049510c',
        code: code,
        redirect_uri: 'http://localhost:8080/oauth/42/'
      },
      json: true
    }))
    if (err) return reject(err)
    resolve(res.access_token)
  })
}

const getUserData = (access_token) => {
  return new Promise(async (resolve, reject) => {
    const [err, res] = await to(request({
      method: 'GET',
      uri: "https://api.intra.42.fr/v2/me",
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    }))
    if (err) return reject(err)
    resolve(res)
  })
}

module.exports = async (call, cb) => {

  var [err, token] = await to(codeToToken(call.request.code))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to exchange code with token'})

  var [err, data] = await to(getUserData(token))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to retrieve user personal data'})

  var [err, user] = await to(User.findOne({email: data.email}))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to check if user already exists'})

  if (user && user.auth !== '42')
    return cb({code: grpc.status.PERMISSION_DENIED, message: `err.oauth.email_associated_with`}) // TODO: Variables

  // if user doenst exist we create it
  if (!user) {
    user = new User({
      username: data.login,
      password: "NOT_NEEDED",
      email: data.email,
      activated: true,
      auth: '42'
    })
    var [err] = await to(user.save())
    if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to create user'})
    ProfileClient.authCreateProfile({
      id: user._id,
      first_name: data.first_name,
      last_name: data.last_name,
      avatar: `ext:${data.image_url}`
    }, () => {})
  }

  var [err, token] = await to(jwt.sign(user))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to generate jwt token'})

  return cb(null, {token})
}
