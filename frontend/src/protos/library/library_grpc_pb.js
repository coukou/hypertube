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

function serialize_hypertube_library_AnimeCountResponse(arg) {
  if (!(arg instanceof library_library_pb.AnimeCountResponse)) {
    throw new Error('Expected argument of type hypertube.library.AnimeCountResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_AnimeCountResponse(buffer_arg) {
  return library_library_pb.AnimeCountResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_hypertube_library_AnimeRequest(arg) {
  if (!(arg instanceof library_library_pb.AnimeRequest)) {
    throw new Error('Expected argument of type hypertube.library.AnimeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_AnimeRequest(buffer_arg) {
  return library_library_pb.AnimeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_AnimeSearchRequest(arg) {
  if (!(arg instanceof library_library_pb.AnimeSearchRequest)) {
    throw new Error('Expected argument of type hypertube.library.AnimeSearchRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_AnimeSearchRequest(buffer_arg) {
  return library_library_pb.AnimeSearchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_Comment(arg) {
  if (!(arg instanceof library_library_pb.Comment)) {
    throw new Error('Expected argument of type hypertube.library.Comment');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_Comment(buffer_arg) {
  return library_library_pb.Comment.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_CommentListRequest(arg) {
  if (!(arg instanceof library_library_pb.CommentListRequest)) {
    throw new Error('Expected argument of type hypertube.library.CommentListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_CommentListRequest(buffer_arg) {
  return library_library_pb.CommentListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_CommentRequest(arg) {
  if (!(arg instanceof library_library_pb.CommentRequest)) {
    throw new Error('Expected argument of type hypertube.library.CommentRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_CommentRequest(buffer_arg) {
  return library_library_pb.CommentRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_hypertube_library_GetTorrentRequest(arg) {
  if (!(arg instanceof library_library_pb.GetTorrentRequest)) {
    throw new Error('Expected argument of type hypertube.library.GetTorrentRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_GetTorrentRequest(buffer_arg) {
  return library_library_pb.GetTorrentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hypertube_library_GetTorrentResponse(arg) {
  if (!(arg instanceof library_library_pb.GetTorrentResponse)) {
    throw new Error('Expected argument of type hypertube.library.GetTorrentResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_hypertube_library_GetTorrentResponse(buffer_arg) {
  return library_library_pb.GetTorrentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LibraryServiceService = exports.LibraryServiceService = {
  getAnime: {
    path: '/hypertube.library.LibraryService/GetAnime',
    requestStream: false,
    responseStream: false,
    requestType: library_library_pb.AnimeRequest,
    responseType: library_library_pb.Anime,
    requestSerialize: serialize_hypertube_library_AnimeRequest,
    requestDeserialize: deserialize_hypertube_library_AnimeRequest,
    responseSerialize: serialize_hypertube_library_Anime,
    responseDeserialize: deserialize_hypertube_library_Anime,
  },
  searchAnime: {
    path: '/hypertube.library.LibraryService/SearchAnime',
    requestStream: false,
    responseStream: true,
    requestType: library_library_pb.AnimeSearchRequest,
    responseType: library_library_pb.Anime,
    requestSerialize: serialize_hypertube_library_AnimeSearchRequest,
    requestDeserialize: deserialize_hypertube_library_AnimeSearchRequest,
    responseSerialize: serialize_hypertube_library_Anime,
    responseDeserialize: deserialize_hypertube_library_Anime,
  },
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
  animeCount: {
    path: '/hypertube.library.LibraryService/AnimeCount',
    requestStream: false,
    responseStream: false,
    requestType: library_library_pb.Empty,
    responseType: library_library_pb.AnimeCountResponse,
    requestSerialize: serialize_hypertube_library_Empty,
    requestDeserialize: deserialize_hypertube_library_Empty,
    responseSerialize: serialize_hypertube_library_AnimeCountResponse,
    responseDeserialize: deserialize_hypertube_library_AnimeCountResponse,
  },
  commentEpisode: {
    path: '/hypertube.library.LibraryService/CommentEpisode',
    requestStream: false,
    responseStream: false,
    requestType: library_library_pb.CommentRequest,
    responseType: library_library_pb.Comment,
    requestSerialize: serialize_hypertube_library_CommentRequest,
    requestDeserialize: deserialize_hypertube_library_CommentRequest,
    responseSerialize: serialize_hypertube_library_Comment,
    responseDeserialize: deserialize_hypertube_library_Comment,
  },
  commentList: {
    path: '/hypertube.library.LibraryService/CommentList',
    requestStream: false,
    responseStream: true,
    requestType: library_library_pb.CommentListRequest,
    responseType: library_library_pb.Comment,
    requestSerialize: serialize_hypertube_library_CommentListRequest,
    requestDeserialize: deserialize_hypertube_library_CommentListRequest,
    responseSerialize: serialize_hypertube_library_Comment,
    responseDeserialize: deserialize_hypertube_library_Comment,
  },
  getAnimeTorrent: {
    path: '/hypertube.library.LibraryService/GetAnimeTorrent',
    requestStream: false,
    responseStream: false,
    requestType: library_library_pb.GetTorrentRequest,
    responseType: library_library_pb.GetTorrentResponse,
    requestSerialize: serialize_hypertube_library_GetTorrentRequest,
    requestDeserialize: deserialize_hypertube_library_GetTorrentRequest,
    responseSerialize: serialize_hypertube_library_GetTorrentResponse,
    responseDeserialize: deserialize_hypertube_library_GetTorrentResponse,
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
