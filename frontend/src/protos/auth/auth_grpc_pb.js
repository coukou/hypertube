// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var auth_auth_pb = require('../auth/auth_pb.js');

function serialize_hypertube_auth_ActivateRequest(arg) {
  if (!(arg instanceof auth_auth_pb.ActivateRequest)) {
    throw new Error('Expected argument of type hypertube.auth.ActivateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_ActivateRequest(buffer_arg) {
  return auth_auth_pb.ActivateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_AuthRequest(arg) {
  if (!(arg instanceof auth_auth_pb.AuthRequest)) {
    throw new Error('Expected argument of type hypertube.auth.AuthRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_AuthRequest(buffer_arg) {
  return auth_auth_pb.AuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_AuthResponse(arg) {
  if (!(arg instanceof auth_auth_pb.AuthResponse)) {
    throw new Error('Expected argument of type hypertube.auth.AuthResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_AuthResponse(buffer_arg) {
  return auth_auth_pb.AuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_EditEmailRequest(arg) {
  if (!(arg instanceof auth_auth_pb.EditEmailRequest)) {
    throw new Error('Expected argument of type hypertube.auth.EditEmailRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_EditEmailRequest(buffer_arg) {
  return auth_auth_pb.EditEmailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_Empty(arg) {
  if (!(arg instanceof auth_auth_pb.Empty)) {
    throw new Error('Expected argument of type hypertube.auth.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_Empty(buffer_arg) {
  return auth_auth_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_OAuthRequest(arg) {
  if (!(arg instanceof auth_auth_pb.OAuthRequest)) {
    throw new Error('Expected argument of type hypertube.auth.OAuthRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_OAuthRequest(buffer_arg) {
  return auth_auth_pb.OAuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_RegisterRequest(arg) {
  if (!(arg instanceof auth_auth_pb.RegisterRequest)) {
    throw new Error('Expected argument of type hypertube.auth.RegisterRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_RegisterRequest(buffer_arg) {
  return auth_auth_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_ResetRequest(arg) {
  if (!(arg instanceof auth_auth_pb.ResetRequest)) {
    throw new Error('Expected argument of type hypertube.auth.ResetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_ResetRequest(buffer_arg) {
  return auth_auth_pb.ResetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_TokenValidRequest(arg) {
  if (!(arg instanceof auth_auth_pb.TokenValidRequest)) {
    throw new Error('Expected argument of type hypertube.auth.TokenValidRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_TokenValidRequest(buffer_arg) {
  return auth_auth_pb.TokenValidRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_auth_TokenValidResponse(arg) {
  if (!(arg instanceof auth_auth_pb.TokenValidResponse)) {
    throw new Error('Expected argument of type hypertube.auth.TokenValidResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_auth_TokenValidResponse(buffer_arg) {
  return auth_auth_pb.TokenValidResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var InternalAuthServiceService = exports.InternalAuthServiceService = {
  // Called by other microservice to check JWT token validity
  tokenIsValid: {
    path: '/hypertube.auth.InternalAuthService/TokenIsValid',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.TokenValidRequest,
    responseType: auth_auth_pb.TokenValidResponse,
    requestSerialize: serialize_hypertube_auth_TokenValidRequest,
    requestDeserialize: deserialize_hypertube_auth_TokenValidRequest,
    responseSerialize: serialize_hypertube_auth_TokenValidResponse,
    responseDeserialize: deserialize_hypertube_auth_TokenValidResponse,
  },
};

exports.InternalAuthServiceClient = grpc.makeGenericClientConstructor(InternalAuthServiceService);
var AuthServiceService = exports.AuthServiceService = {
  register: {
    path: '/hypertube.auth.AuthService/Register',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.RegisterRequest,
    responseType: auth_auth_pb.Empty,
    requestSerialize: serialize_hypertube_auth_RegisterRequest,
    requestDeserialize: deserialize_hypertube_auth_RegisterRequest,
    responseSerialize: serialize_hypertube_auth_Empty,
    responseDeserialize: deserialize_hypertube_auth_Empty,
  },
  logout: {
    path: '/hypertube.auth.AuthService/Logout',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.Empty,
    responseType: auth_auth_pb.Empty,
    requestSerialize: serialize_hypertube_auth_Empty,
    requestDeserialize: deserialize_hypertube_auth_Empty,
    responseSerialize: serialize_hypertube_auth_Empty,
    responseDeserialize: deserialize_hypertube_auth_Empty,
  },
  reset: {
    path: '/hypertube.auth.AuthService/Reset',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.ResetRequest,
    responseType: auth_auth_pb.Empty,
    requestSerialize: serialize_hypertube_auth_ResetRequest,
    requestDeserialize: deserialize_hypertube_auth_ResetRequest,
    responseSerialize: serialize_hypertube_auth_Empty,
    responseDeserialize: deserialize_hypertube_auth_Empty,
  },
  activate: {
    path: '/hypertube.auth.AuthService/Activate',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.ActivateRequest,
    responseType: auth_auth_pb.Empty,
    requestSerialize: serialize_hypertube_auth_ActivateRequest,
    requestDeserialize: deserialize_hypertube_auth_ActivateRequest,
    responseSerialize: serialize_hypertube_auth_Empty,
    responseDeserialize: deserialize_hypertube_auth_Empty,
  },
  editEmail: {
    path: '/hypertube.auth.AuthService/EditEmail',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.EditEmailRequest,
    responseType: auth_auth_pb.Empty,
    requestSerialize: serialize_hypertube_auth_EditEmailRequest,
    requestDeserialize: deserialize_hypertube_auth_EditEmailRequest,
    responseSerialize: serialize_hypertube_auth_Empty,
    responseDeserialize: deserialize_hypertube_auth_Empty,
  },
  // this is legacy auth
  auth: {
    path: '/hypertube.auth.AuthService/Auth',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.AuthRequest,
    responseType: auth_auth_pb.AuthResponse,
    requestSerialize: serialize_hypertube_auth_AuthRequest,
    requestDeserialize: deserialize_hypertube_auth_AuthRequest,
    responseSerialize: serialize_hypertube_auth_AuthResponse,
    responseDeserialize: deserialize_hypertube_auth_AuthResponse,
  },
  // OAuth
  oauth42: {
    path: '/hypertube.auth.AuthService/Oauth42',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.OAuthRequest,
    responseType: auth_auth_pb.AuthResponse,
    requestSerialize: serialize_hypertube_auth_OAuthRequest,
    requestDeserialize: deserialize_hypertube_auth_OAuthRequest,
    responseSerialize: serialize_hypertube_auth_AuthResponse,
    responseDeserialize: deserialize_hypertube_auth_AuthResponse,
  },
  oauthGithub: {
    path: '/hypertube.auth.AuthService/OauthGithub',
    requestStream: false,
    responseStream: false,
    requestType: auth_auth_pb.OAuthRequest,
    responseType: auth_auth_pb.AuthResponse,
    requestSerialize: serialize_hypertube_auth_OAuthRequest,
    requestDeserialize: deserialize_hypertube_auth_OAuthRequest,
    responseSerialize: serialize_hypertube_auth_AuthResponse,
    responseDeserialize: deserialize_hypertube_auth_AuthResponse,
  },
};

exports.AuthServiceClient = grpc.makeGenericClientConstructor(AuthServiceService);
