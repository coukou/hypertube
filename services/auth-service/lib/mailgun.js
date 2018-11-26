const mailgun = require('mailgun-js')({
  apiKey: 'de9dfa1d53a4712cbba29bbda3d3dc18-b0aac6d0-adbbe185',
  publicApiKey: 'pubkey-f4fc29fbf1a8ed6ea76b074b87e5288d',
  domain: 'spopieul.me' 
}) 

module.exports.validate = (email) => {
  return new Promise((resolve, reject) => {
    mailgun.validate(email, (err, body) => {
      if (err) return reject(err)
      return resolve(body)
    })
  })
}

module.exports.send = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const payload = {
      from: `Hypertube <hypertube@spopieul.me>`,
      to: to,
      subject: subject,
      text: text
    }
    mailgun.messages().send(payload, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
