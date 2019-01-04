const fs = require('fs')
const uuid = require('uuid/v1')
const path = require('path')
const express = require('express')
const formidable = require('formidable')
const jwtDecode = require('jwt-decode')

const authService = require('./auth-service')
const profileService = require('./profile-service')

const app = express()
const uploadDir = path.resolve(__dirname, '../uploads')


app.post('/avatar', (req, res) => {
  let avatar = undefined
  const token = req.query.at

  // we check access token validity
  authService.tokenIsValid({token}, (err, data) => {
    if (err || !data.valid)
      return res.status(403).end()

    // we handle form
    new formidable.IncomingForm().parse(req)
      .on('fileBegin', (name, file) => {
        if (file.type !== 'image/png')
          return res.status(403).end()
        file.name = uuid()
        file.path = path.resolve(uploadDir, file.name)
        avatar = `ht:${file.name}`
      })
      .on('end', () => {
        const id = jwtDecode(token)._id
        profileService.updateAvatar({id, avatar}, err => {
          if (err) return res.status(500).end()
          res.status(200).type('json').end(JSON.stringify({avatar}))
        })
      })
  })
})

app.get('/avatar/:file', (req, res) => {
  const name = path.parse(req.params.file).base
  const filename = path.join(uploadDir, name)
  fs.exists(filename, exists => {
    if (!exists)
      return res.status(404).end()
    res.type('image/png')
    fs.createReadStream(filename).pipe(res)
  })
})

app.listen(3000)
