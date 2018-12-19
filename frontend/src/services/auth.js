import store from "../store";
import { AuthServiceClient } from "@/protos/auth/auth_grpc_web_pb";
import * as pb from "@/protos/auth/auth_pb";

const authClient = new AuthServiceClient(
  "http://192.168.99.100:31380",
  null,
  null
);

const createMetadata = () => {
  return {
    "access-token": store.state.accessToken
  };
};

const unaryCall = (method, metadata, req) => {
  return new Promise((resolve, reject) => {
    method(req, metadata, (err, data) => {
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
    return unaryCall(authClient[`oauth${type}`].bind(authClient), {}, req);
  },
  register({ username, password, email }) {
    const req = new pb.RegisterRequest();
    req.setUsername(username);
    req.setPassword(password);
    req.setEmail(email);
    return unaryCall(authClient.register.bind(authClient), {}, req);
  },
  editEmail({ email, password }) {
    const req = new pb.EditEmailRequest();
    req.setEmail(email);
    req.setPassword(password);
    return unaryCall(
      authClient.editEmail.bind(authClient),
      createMetadata(),
      req
    );
  }
};
