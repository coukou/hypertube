/**
 * @fileoverview gRPC-Web generated client stub for hypertube.auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.hypertube = {};
proto.hypertube.auth = require('./auth_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hypertube.auth.AuthServiceClient =
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
proto.hypertube.auth.AuthServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.hypertube.auth.AuthServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.hypertube.auth.AuthServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.RegisterRequest,
 *   !proto.hypertube.auth.Empty>}
 */
const methodInfo_AuthService_Register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.Empty,
  /** @param {!proto.hypertube.auth.RegisterRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/Register',
      request,
      metadata || {},
      methodInfo_AuthService_Register,
      callback);
};


/**
 * @param {!proto.hypertube.auth.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.register =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.register(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.Empty,
 *   !proto.hypertube.auth.Empty>}
 */
const methodInfo_AuthService_Logout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.Empty,
  /** @param {!proto.hypertube.auth.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/Logout',
      request,
      metadata || {},
      methodInfo_AuthService_Logout,
      callback);
};


/**
 * @param {!proto.hypertube.auth.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.logout =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.logout(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.ResetRequest,
 *   !proto.hypertube.auth.Empty>}
 */
const methodInfo_AuthService_Reset = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.Empty,
  /** @param {!proto.hypertube.auth.ResetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.ResetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.reset =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/Reset',
      request,
      metadata || {},
      methodInfo_AuthService_Reset,
      callback);
};


/**
 * @param {!proto.hypertube.auth.ResetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.reset =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.reset(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.ActivateRequest,
 *   !proto.hypertube.auth.Empty>}
 */
const methodInfo_AuthService_Activate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.Empty,
  /** @param {!proto.hypertube.auth.ActivateRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.ActivateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.activate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/Activate',
      request,
      metadata || {},
      methodInfo_AuthService_Activate,
      callback);
};


/**
 * @param {!proto.hypertube.auth.ActivateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.activate =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.activate(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.EditEmailRequest,
 *   !proto.hypertube.auth.Empty>}
 */
const methodInfo_AuthService_EditEmail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.Empty,
  /** @param {!proto.hypertube.auth.EditEmailRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.EditEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.editEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/EditEmail',
      request,
      metadata || {},
      methodInfo_AuthService_EditEmail,
      callback);
};


/**
 * @param {!proto.hypertube.auth.EditEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.editEmail =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.editEmail(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.EditPasswordRequest,
 *   !proto.hypertube.auth.Empty>}
 */
const methodInfo_AuthService_EditPassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.Empty,
  /** @param {!proto.hypertube.auth.EditPasswordRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.Empty.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.EditPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.editPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/EditPassword',
      request,
      metadata || {},
      methodInfo_AuthService_EditPassword,
      callback);
};


/**
 * @param {!proto.hypertube.auth.EditPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.editPassword =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.editPassword(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.AuthRequest,
 *   !proto.hypertube.auth.AuthResponse>}
 */
const methodInfo_AuthService_Auth = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.AuthResponse,
  /** @param {!proto.hypertube.auth.AuthRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.AuthResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.AuthRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.AuthResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.AuthResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.auth =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/Auth',
      request,
      metadata || {},
      methodInfo_AuthService_Auth,
      callback);
};


/**
 * @param {!proto.hypertube.auth.AuthRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.AuthResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.auth =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.auth(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.OAuthRequest,
 *   !proto.hypertube.auth.AuthResponse>}
 */
const methodInfo_AuthService_Oauth42 = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.AuthResponse,
  /** @param {!proto.hypertube.auth.OAuthRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.AuthResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.OAuthRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.AuthResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.AuthResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.oauth42 =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/Oauth42',
      request,
      metadata || {},
      methodInfo_AuthService_Oauth42,
      callback);
};


/**
 * @param {!proto.hypertube.auth.OAuthRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.AuthResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.oauth42 =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.oauth42(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.OAuthRequest,
 *   !proto.hypertube.auth.AuthResponse>}
 */
const methodInfo_AuthService_OauthGithub = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.AuthResponse,
  /** @param {!proto.hypertube.auth.OAuthRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.AuthResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.OAuthRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.AuthResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.AuthResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.oauthGithub =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/OauthGithub',
      request,
      metadata || {},
      methodInfo_AuthService_OauthGithub,
      callback);
};


/**
 * @param {!proto.hypertube.auth.OAuthRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.AuthResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.oauthGithub =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.oauthGithub(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hypertube.auth.TokenValidRequest,
 *   !proto.hypertube.auth.TokenValidResponse>}
 */
const methodInfo_AuthService_TokenIsValid = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hypertube.auth.TokenValidResponse,
  /** @param {!proto.hypertube.auth.TokenValidRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hypertube.auth.TokenValidResponse.deserializeBinary
);


/**
 * @param {!proto.hypertube.auth.TokenValidRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hypertube.auth.TokenValidResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hypertube.auth.TokenValidResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServiceClient.prototype.tokenIsValid =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hypertube.auth.AuthService/TokenIsValid',
      request,
      metadata || {},
      methodInfo_AuthService_TokenIsValid,
      callback);
};


/**
 * @param {!proto.hypertube.auth.TokenValidRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hypertube.auth.TokenValidResponse>}
 *     The XHR Node Readable Stream
 */
proto.hypertube.auth.AuthServicePromiseClient.prototype.tokenIsValid =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.tokenIsValid(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.hypertube.auth;

