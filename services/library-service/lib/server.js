const mongoose = require('mongoose')
const grpc = require('grpc')

const services = require('./services')

// here we try to connect to the auth-mongo
mongoose.connect('mongodb://user:pass@library-mongo:27017/library', {useNewUrlParser: true}).catch(err => {
  console.log('Unable to connect to library-mongo:', err)
  process.exit()
})

const server = new grpc.Server()

server.addService(services.library.service, services.library.handlers)
server.addService(services.internal.service, services.internal.handlers)

server.bind('127.0.0.1:3000', grpc.ServerCredentials.createInsecure())
server.start()
