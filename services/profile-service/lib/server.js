const mongoose = require('mongoose')
const grpc = require('grpc')

const services = require('./services')

// here we try to connect to the auth-mongo
mongoose.connect('mongodb://user:pass@profile-mongo:27017/profile', {useNewUrlParser: true}).catch(err => {
  console.log('Unable to connect to profile-mongo:', err)
  process.exit()
})

const server = new grpc.Server()

server.addService(services.profile.service, services.profile.handlers)
server.addService(services.internal.service, services.internal.handlers)

server.bind('127.0.0.1:3000', grpc.ServerCredentials.createInsecure())
server.start()
