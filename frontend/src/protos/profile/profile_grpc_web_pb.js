/**
 * @fileoverview gRPC-Web generated client stub for hypertube.profile
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.hypertube = {};
proto.hypertube.profile = require('./profile_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hypertube.profile.ProfileServiceClient =
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
proto.hypertube.profile.ProfileServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.hypertube.profile.ProfileServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.hypertube.profile.ProfileServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.profile.Empty,
 *   !proto.hypertube.profile.MyProfileResponse>}
 */
const methodInfo_ProfileService_MyProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.profile.MyProfileResponse,
  /** @param {!proto.hypertube.profile.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.profile.MyProfileResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.profile.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.profile.MyProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.profile.MyProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.ProfileServiceClient.prototype.myProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.profile.ProfileService/MyProfile',
      request,
      metadata,
      methodInfo_ProfileService_MyProfile,
      callback);
};


/**
 * @param {!proto.hypertube.profile.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.profile.MyProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.ProfileServicePromiseClient.prototype.myProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.myProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.profile.ProfileRequest,
 *   !proto.hypertube.profile.ProfileResponse>}
 */
const methodInfo_ProfileService_Profile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.profile.ProfileResponse,
  /** @param {!proto.hypertube.profile.ProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.profile.ProfileResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.profile.ProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.profile.ProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.profile.ProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.ProfileServiceClient.prototype.profile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.profile.ProfileService/Profile',
      request,
      metadata,
      methodInfo_ProfileService_Profile,
      callback);
};


/**
 * @param {!proto.hypertube.profile.ProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.profile.ProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.ProfileServicePromiseClient.prototype.profile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.profile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.profile.EditRequest,
 *   !proto.hypertube.profile.ProfileResponse>}
 */
const methodInfo_ProfileService_Edit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.profile.ProfileResponse,
  /** @param {!proto.hypertube.profile.EditRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.profile.ProfileResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.profile.EditRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.profile.ProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.profile.ProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.ProfileServiceClient.prototype.edit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.profile.ProfileService/Edit',
      request,
      metadata,
      methodInfo_ProfileService_Edit,
      callback);
};


/**
 * @param {!proto.hypertube.profile.EditRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.profile.ProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.ProfileServicePromiseClient.prototype.edit =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.edit(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hypertube.profile.InternalProfileServiceClient =
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
proto.hypertube.profile.InternalProfileServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.hypertube.profile.InternalProfileServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.hypertube.profile.InternalProfileServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.profile.UpdateAvatarRequest,
 *   !proto.hypertube.profile.Empty>}
 */
const methodInfo_InternalProfileService_UpdateAvatar = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.profile.Empty,
  /** @param {!proto.hypertube.profile.UpdateAvatarRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.profile.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.profile.UpdateAvatarRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.profile.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.profile.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.InternalProfileServiceClient.prototype.updateAvatar =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.profile.InternalProfileService/UpdateAvatar',
      request,
      metadata,
      methodInfo_InternalProfileService_UpdateAvatar,
      callback);
};


/**
 * @param {!proto.hypertube.profile.UpdateAvatarRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.profile.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.InternalProfileServicePromiseClient.prototype.updateAvatar =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateAvatar(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.profile.AuthCreateProfileRequest,
 *   !proto.hypertube.profile.Empty>}
 */
const methodInfo_InternalProfileService_AuthCreateProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.profile.Empty,
  /** @param {!proto.hypertube.profile.AuthCreateProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.profile.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.profile.AuthCreateProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.profile.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.profile.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.InternalProfileServiceClient.prototype.authCreateProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.profile.InternalProfileService/AuthCreateProfile',
      request,
      metadata,
      methodInfo_InternalProfileService_AuthCreateProfile,
      callback);
};


/**
 * @param {!proto.hypertube.profile.AuthCreateProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.profile.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.profile.InternalProfileServicePromiseClient.prototype.authCreateProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.authCreateProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.hypertube.profile;

