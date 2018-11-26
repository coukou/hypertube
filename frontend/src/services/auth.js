import { AuthServiceClient } from "@/protos/auth/auth_grpc_web_pb";
import * as pb from "@/protos/auth/auth_pb";

const authClient = new AuthServiceClient(
  "http://192.168.99.100:31380",
  null,
  null
);

const unaryCall = (method, req) => {
  return new Promise((resolve, reject) => {
    method(req, {}, (err, data) => {
      if (!err) return resolve(data);
      if (err.code === 3) return console.log(err); // TODO: server validation errors
      reject(err);
    });
  });
};

export default {
  oauth({ type, code }) {
    const req = new pb.OAuthRequest();
    req.setCode(code);
    type = type[0].toUpperCase() + type.slice(1);
    return unaryCall(authClient[`oauth${type}`].bind(authClient), req);
  },
  register({ username, password, email }) {
    const req = new pb.RegisterRequest({
      username: username,
      password: password,
      email: email
    });
    return unaryCall(authClient.register.bind(authClient), req);
  }
};
