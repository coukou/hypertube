import store from "../store";
import { ProfileServiceClient } from "../protos/profile/profile_grpc_web_pb";
import { Empty, EditRequest } from "../protos/profile/profile_pb";

const profileClient = new ProfileServiceClient(
  "http://192.168.99.100:31380",
  null,
  null
);

const createMetadata = () => {
  return {
    "access-token": store.state.accessToken
  };
};

const unaryCall = (method, req) => {
  return new Promise((resolve, reject) => {
    method(req, createMetadata(), (err, data) => {
      if (!err) return resolve(data);
      if (err.code === 3) return; // TODO: should handle server validation errors ?
      // error 7 is permission denied
      if (err.code === 7) return store.commit("logout");
      reject(err);
    });
  });
};

export default {
  myProfile() {
    const req = new Empty();
    return unaryCall(profileClient.myProfile.bind(profileClient), req);
  },
  edit(data) {
    const req = new EditRequest();
    req.setLastName(data.lastName);
    req.setFirstName(data.firstName);
    return unaryCall(profileClient.edit.bind(profileClient), req);
  }
};
