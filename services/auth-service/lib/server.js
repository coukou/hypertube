const mongoose = require('mongoose')
const path = require('path')
const grpc = require('grpc')

const services = require('./services')

// here we try to connect to the auth-mongo
mongoose.connect('mongodb://user:pass@auth-mongo:27017/auth', {useNewUrlParser: true}).catch(err => {
  console.log('Unable to connect to auth-mongo:', err)
  process.exit()
})

const server = new grpc.Server()

const pkgDef = require('@grpc/proto-loader').loadSync(path.join(__dirname, '../protos/auth/auth.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const pb = grpc.loadPackageDefinition(pkgDef).hypertube.auth
server.addService(services.auth.service, services.auth.handlers)
server.bind('127.0.0.1:3000', grpc.ServerCredentials.createInsecure())
server.start()
