/**
 * @fileoverview gRPC-Web generated client stub for hypertube.library
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.hypertube = {};
proto.hypertube.library = require('./library_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hypertube.library.LibraryServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hypertube.library.LibraryServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.hypertube.library.LibraryServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.hypertube.library.LibraryServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.library.AnimeRequest,
 *   !proto.hypertube.library.Anime>}
 */
const methodInfo_LibraryService_GetAnime = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.library.Anime,
  /** @param {!proto.hypertube.library.AnimeRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.library.Anime.deserializeBinary
);


/**
 * @param {!proto.hypertube.library.AnimeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.library.Anime)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.Anime>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServiceClient.prototype.getAnime =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.library.LibraryService/GetAnime',
      request,
      metadata || {},
      methodInfo_LibraryService_GetAnime,
      callback);
};


/**
 * @param {!proto.hypertube.library.AnimeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.library.Anime>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServicePromiseClient.prototype.getAnime =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getAnime(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.library.AnimeListRequest,
 *   !proto.hypertube.library.Anime>}
 */
const methodInfo_LibraryService_AnimeList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.library.Anime,
  /** @param {!proto.hypertube.library.AnimeListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.library.Anime.deserializeBinary
);


/**
 * @param {!proto.hypertube.library.AnimeListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.Anime>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServiceClient.prototype.animeList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/hypertube.library.LibraryService/AnimeList',
      request,
      metadata,
      methodInfo_LibraryService_AnimeList);
};


/**
 * @param {!proto.hypertube.library.AnimeListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.Anime>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServicePromiseClient.prototype.animeList =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/hypertube.library.LibraryService/AnimeList',
      request,
      metadata,
      methodInfo_LibraryService_AnimeList);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.library.CommentRequest,
 *   !proto.hypertube.library.Comment>}
 */
const methodInfo_LibraryService_CommentEpisode = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.library.Comment,
  /** @param {!proto.hypertube.library.CommentRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.library.Comment.deserializeBinary
);


/**
 * @param {!proto.hypertube.library.CommentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.library.Comment)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.Comment>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServiceClient.prototype.commentEpisode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.library.LibraryService/CommentEpisode',
      request,
      metadata || {},
      methodInfo_LibraryService_CommentEpisode,
      callback);
};


/**
 * @param {!proto.hypertube.library.CommentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.library.Comment>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServicePromiseClient.prototype.commentEpisode =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.commentEpisode(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.library.CommentListRequest,
 *   !proto.hypertube.library.Comment>}
 */
const methodInfo_LibraryService_CommentList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.library.Comment,
  /** @param {!proto.hypertube.library.CommentListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.library.Comment.deserializeBinary
);


/**
 * @param {!proto.hypertube.library.CommentListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.Comment>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServiceClient.prototype.commentList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/hypertube.library.LibraryService/CommentList',
      request,
      metadata,
      methodInfo_LibraryService_CommentList);
};


/**
 * @param {!proto.hypertube.library.CommentListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.Comment>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.LibraryServicePromiseClient.prototype.commentList =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/hypertube.library.LibraryService/CommentList',
      request,
      metadata,
      methodInfo_LibraryService_CommentList);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hypertube.library.InternalLibraryServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hypertube.library.InternalLibraryServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.hypertube.library.InternalLibraryServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.hypertube.library.InternalLibraryServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.library.AnimeAddRequest,
 *   !proto.hypertube.library.AnimeAddResponse>}
 */
const methodInfo_InternalLibraryService_AddAnime = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.library.AnimeAddResponse,
  /** @param {!proto.hypertube.library.AnimeAddRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.library.AnimeAddResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.library.AnimeAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.library.AnimeAddResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.AnimeAddResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.InternalLibraryServiceClient.prototype.addAnime =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.library.InternalLibraryService/AddAnime',
      request,
      metadata || {},
      methodInfo_InternalLibraryService_AddAnime,
      callback);
};


/**
 * @param {!proto.hypertube.library.AnimeAddRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.library.AnimeAddResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.InternalLibraryServicePromiseClient.prototype.addAnime =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.addAnime(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.library.AnimeAddEpisodeRequest,
 *   !proto.hypertube.library.Empty>}
 */
const methodInfo_InternalLibraryService_AddAnimeEpisode = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.library.Empty,
  /** @param {!proto.hypertube.library.AnimeAddEpisodeRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.library.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.library.AnimeAddEpisodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.library.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.InternalLibraryServiceClient.prototype.addAnimeEpisode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.library.InternalLibraryService/AddAnimeEpisode',
      request,
      metadata || {},
      methodInfo_InternalLibraryService_AddAnimeEpisode,
      callback);
};


/**
 * @param {!proto.hypertube.library.AnimeAddEpisodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.library.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.InternalLibraryServicePromiseClient.prototype.addAnimeEpisode =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.addAnimeEpisode(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.library.GetTorrentRequest,
 *   !proto.hypertube.library.GetTorrentResponse>}
 */
const methodInfo_InternalLibraryService_GetAnimeTorrent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.library.GetTorrentResponse,
  /** @param {!proto.hypertube.library.GetTorrentRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.library.GetTorrentResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.library.GetTorrentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.library.GetTorrentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.library.GetTorrentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.InternalLibraryServiceClient.prototype.getAnimeTorrent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.library.InternalLibraryService/GetAnimeTorrent',
      request,
      metadata || {},
      methodInfo_InternalLibraryService_GetAnimeTorrent,
      callback);
};


/**
 * @param {!proto.hypertube.library.GetTorrentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.library.GetTorrentResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.library.InternalLibraryServicePromiseClient.prototype.getAnimeTorrent =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getAnimeTorrent(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.hypertube.library;

