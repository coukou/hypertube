const http = require('http')
const redis = require('redis')
const client = redis.createClient({
  host: 'auth-redis'
})
client.on('error', (err) => {
  console.log('redis error', err)
})
client.on('connect', (err) => {
  console.log('redis connected')
})

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end(`served from: ${process.env['MY_POD_IP']}`)
})
server.listen(3000, () => console.log('auth-service listenin on :3000'))
