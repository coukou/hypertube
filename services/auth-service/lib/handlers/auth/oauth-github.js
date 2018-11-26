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
      uri: 'https://github.com/login/oauth/access_token',
      body: {
        grant_type: 'authorization_code',
        client_id: '88c839de63c8690b4908',
        client_secret: '661f7a418e562e5fe34b81fa6e8901a99669d022',
        code: code,
        redirect_uri: 'http://localhost:8080/oauth/github/'
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
      uri: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${access_token}`,
        'user-agent': 'Hypertube Auth User Agent'
      },
      json: true
    }))
    if (err) return reject(err)
    resolve(res)
  })
}

const getUserEmail = (access_token) => {
  return new Promise(async (resolve, reject) => {
    const [err, res] = await to(request({
      method: 'GET',
      uri: 'https://api.github.com/user/emails',
      headers: {
        Authorization: `token ${access_token}`,
        'user-agent': 'Hypertube Auth User Agent'
      },
      json: true
    }))
    if (err) return reject(err)
    const email = res.find(e => e.primary)
    if (email === undefined)
      return reject(`Github user with no email wtf??`)
    resolve(email.email)
  })
}

module.exports = async (call, cb) => {
  var [err, token] = await to(codeToToken(call.request.code))
  if (err) return cb({code: grpc.status.INTERNAL, message: `unable to exchange code with token ${err}`})

  var [err, data] = await to(getUserData(token))
  if (err) return cb({code: grpc.status.INTERNAL, message: `unable to retrieve user personal data: ${err}`})

  var [err, email] = await to(getUserEmail(token))
  if (err) return cb({code: grpc.status.INTERNAL, message: `unable to retrieve user email: ${err}`})

  data.email = email

  var [err, user] = await to(User.findOne({ email: data.email }))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to check if user already exists'})
  
  if (user && user.auth !== 'github')
    return cb({code: grpc.status.PERMISSION_DENIED, message: `${user.email} associated with ${user.auth} auth`})

  // if user doenst exist we create it
  if (!user) {
    user = new User({
      username: data.login,
      password: "SUPER_OAUTH_PASSWORD PLEASE CHANGE ME LUL",
      email: data.email,
      activated: true,
      auth: 'github'
    })
    var [err] = await to(user.save())
    if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to create user'})
    ProfileClient.authCreateProfile({
      id: user._id,
      avatar: `ext:${data.avatar_url}`,
    }, () => {})
  }

  var [err, token] = await to(jwt.sign(user))
  if (err) return cb({code: grpc.status.INTERNAL, message: 'unable to generate jwt token'})

  return cb(null, {token})
}
