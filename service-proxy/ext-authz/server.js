const http = require('http')

const server = http.createServer((req, res) => {
  const token = req.headers.access_token

  // here we should check if
  // - Token signature is valid
  // - Token not revoked

  res.writeHead(200)
  res.end()
})

server.listen(10003, () => console.log('ext-auth listenin on :10003'))
