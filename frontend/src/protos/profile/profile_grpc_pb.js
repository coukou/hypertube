// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var profile_profile_pb = require('../profile/profile_pb.js');

function serialize_hypertube_profile_AuthCreateProfileRequest(arg) {
  if (!(arg instanceof profile_profile_pb.AuthCreateProfileRequest)) {
    throw new Error('Expected argument of type hypertube.profile.AuthCreateProfileRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_profile_AuthCreateProfileRequest(buffer_arg) {
  return profile_profile_pb.AuthCreateProfileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_profile_EditRequest(arg) {
  if (!(arg instanceof profile_profile_pb.EditRequest)) {
    throw new Error('Expected argument of type hypertube.profile.EditRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_profile_EditRequest(buffer_arg) {
  return profile_profile_pb.EditRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_profile_Empty(arg) {
  if (!(arg instanceof profile_profile_pb.Empty)) {
    throw new Error('Expected argument of type hypertube.profile.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_profile_Empty(buffer_arg) {
  return profile_profile_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_profile_MyProfileResponse(arg) {
  if (!(arg instanceof profile_profile_pb.MyProfileResponse)) {
    throw new Error('Expected argument of type hypertube.profile.MyProfileResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_profile_MyProfileResponse(buffer_arg) {
  return profile_profile_pb.MyProfileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_profile_ProfileRequest(arg) {
  if (!(arg instanceof profile_profile_pb.ProfileRequest)) {
    throw new Error('Expected argument of type hypertube.profile.ProfileRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_profile_ProfileRequest(buffer_arg) {
  return profile_profile_pb.ProfileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_profile_ProfileResponse(arg) {
  if (!(arg instanceof profile_profile_pb.ProfileResponse)) {
    throw new Error('Expected argument of type hypertube.profile.ProfileResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_profile_ProfileResponse(buffer_arg) {
  return profile_profile_pb.ProfileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_profile_UpdateAvatarRequest(arg) {
  if (!(arg instanceof profile_profile_pb.UpdateAvatarRequest)) {
    throw new Error('Expected argument of type hypertube.profile.UpdateAvatarRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_profile_UpdateAvatarRequest(buffer_arg) {
  return profile_profile_pb.UpdateAvatarRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProfileServiceService = exports.ProfileServiceService = {
  // Retrieve current user profile
  myProfile: {
    path: '/hypertube.profile.ProfileService/MyProfile',
    requestStream: false,
    responseStream: false,
    requestType: profile_profile_pb.Empty,
    responseType: profile_profile_pb.MyProfileResponse,
    requestSerialize: serialize_hypertube_profile_Empty,
    requestDeserialize: deserialize_hypertube_profile_Empty,
    responseSerialize: serialize_hypertube_profile_MyProfileResponse,
    responseDeserialize: deserialize_hypertube_profile_MyProfileResponse,
  },
  // Retrieve profile by id
  profile: {
    path: '/hypertube.profile.ProfileService/Profile',
    requestStream: false,
    responseStream: false,
    requestType: profile_profile_pb.ProfileRequest,
    responseType: profile_profile_pb.ProfileResponse,
    requestSerialize: serialize_hypertube_profile_ProfileRequest,
    requestDeserialize: deserialize_hypertube_profile_ProfileRequest,
    responseSerialize: serialize_hypertube_profile_ProfileResponse,
    responseDeserialize: deserialize_hypertube_profile_ProfileResponse,
  },
  // Edit profile of the current user
  edit: {
    path: '/hypertube.profile.ProfileService/Edit',
    requestStream: false,
    responseStream: false,
    requestType: profile_profile_pb.EditRequest,
    responseType: profile_profile_pb.ProfileResponse,
    requestSerialize: serialize_hypertube_profile_EditRequest,
    requestDeserialize: deserialize_hypertube_profile_EditRequest,
    responseSerialize: serialize_hypertube_profile_ProfileResponse,
    responseDeserialize: deserialize_hypertube_profile_ProfileResponse,
  },
};

exports.ProfileServiceClient = grpc.makeGenericClientConstructor(ProfileServiceService);
var InternalProfileServiceService = exports.InternalProfileServiceService = {
  // called by AvatarService when avatar upload succeed
  updateAvatar: {
    path: '/hypertube.profile.InternalProfileService/UpdateAvatar',
    requestStream: false,
    responseStream: false,
    requestType: profile_profile_pb.UpdateAvatarRequest,
    responseType: profile_profile_pb.Empty,
    requestSerialize: serialize_hypertube_profile_UpdateAvatarRequest,
    requestDeserialize: deserialize_hypertube_profile_UpdateAvatarRequest,
    responseSerialize: serialize_hypertube_profile_Empty,
    responseDeserialize: deserialize_hypertube_profile_Empty,
  },
  // called by AuthService when user create an account
  authCreateProfile: {
    path: '/hypertube.profile.InternalProfileService/AuthCreateProfile',
    requestStream: false,
    responseStream: false,
    requestType: profile_profile_pb.AuthCreateProfileRequest,
    responseType: profile_profile_pb.Empty,
    requestSerialize: serialize_hypertube_profile_AuthCreateProfileRequest,
    requestDeserialize: deserialize_hypertube_profile_AuthCreateProfileRequest,
    responseSerialize: serialize_hypertube_profile_Empty,
    responseDeserialize: deserialize_hypertube_profile_Empty,
  },
};

exports.InternalProfileServiceClient = grpc.makeGenericClientConstructor(InternalProfileServiceService);
