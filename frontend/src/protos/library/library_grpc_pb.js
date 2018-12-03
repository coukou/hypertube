// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var library_library_pb = require('../library/library_pb.js');

function serialize_hypertube_library_Anime(arg) {
  if (!(arg instanceof library_library_pb.Anime)) {
    throw new Error('Expected argument of type hypertube.library.Anime');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_Anime(buffer_arg) {
  return library_library_pb.Anime.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_AnimeAddEpisodeRequest(arg) {
  if (!(arg instanceof library_library_pb.AnimeAddEpisodeRequest)) {
    throw new Error('Expected argument of type hypertube.library.AnimeAddEpisodeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_AnimeAddEpisodeRequest(buffer_arg) {
  return library_library_pb.AnimeAddEpisodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_AnimeAddRequest(arg) {
  if (!(arg instanceof library_library_pb.AnimeAddRequest)) {
    throw new Error('Expected argument of type hypertube.library.AnimeAddRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_AnimeAddRequest(buffer_arg) {
  return library_library_pb.AnimeAddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_AnimeAddResponse(arg) {
  if (!(arg instanceof library_library_pb.AnimeAddResponse)) {
    throw new Error('Expected argument of type hypertube.library.AnimeAddResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_AnimeAddResponse(buffer_arg) {
  return library_library_pb.AnimeAddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_AnimeListRequest(arg) {
  if (!(arg instanceof library_library_pb.AnimeListRequest)) {
    throw new Error('Expected argument of type hypertube.library.AnimeListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_AnimeListRequest(buffer_arg) {
  return library_library_pb.AnimeListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_Empty(arg) {
  if (!(arg instanceof library_library_pb.Empty)) {
    throw new Error('Expected argument of type hypertube.library.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_Empty(buffer_arg) {
  return library_library_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var LibraryServiceService = exports.LibraryServiceService = {
  animeList: {
    path: '/hypertube.library.LibraryService/AnimeList',
    requestStream: false,
    responseStream: true,
    requestType: library_library_pb.AnimeListRequest,
    responseType: library_library_pb.Anime,
    requestSerialize: serialize_hypertube_library_AnimeListRequest,
    requestDeserialize: deserialize_hypertube_library_AnimeListRequest,
    responseSerialize: serialize_hypertube_library_Anime,
    responseDeserialize: deserialize_hypertube_library_Anime,
  },
};

exports.LibraryServiceClient = grpc.makeGenericClientConstructor(LibraryServiceService);
var InternalLibraryServiceService = exports.InternalLibraryServiceService = {
  addAnime: {
    path: '/hypertube.library.InternalLibraryService/AddAnime',
    requestStream: false,
    responseStream: false,
    requestType: library_library_pb.AnimeAddRequest,
    responseType: library_library_pb.AnimeAddResponse,
    requestSerialize: serialize_hypertube_library_AnimeAddRequest,
    requestDeserialize: deserialize_hypertube_library_AnimeAddRequest,
    responseSerialize: serialize_hypertube_library_AnimeAddResponse,
    responseDeserialize: deserialize_hypertube_library_AnimeAddResponse,
  },
  addAnimeEpisode: {
    path: '/hypertube.library.InternalLibraryService/AddAnimeEpisode',
    requestStream: false,
    responseStream: false,
    requestType: library_library_pb.AnimeAddEpisodeRequest,
    responseType: library_library_pb.Empty,
    requestSerialize: serialize_hypertube_library_AnimeAddEpisodeRequest,
    requestDeserialize: deserialize_hypertube_library_AnimeAddEpisodeRequest,
    responseSerialize: serialize_hypertube_library_Empty,
    responseDeserialize: deserialize_hypertube_library_Empty,
  },
};

exports.InternalLibraryServiceClient = grpc.makeGenericClientConstructor(InternalLibraryServiceService);
