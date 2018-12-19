import store from "../store";
import { LibraryServiceClient } from "../protos/library/library_grpc_web_pb";
import * as pb from "../protos/library/library_pb";

const libraryClient = new LibraryServiceClient(
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
    method(req, {}, (err, data) => {
      if (!err) return resolve(data);
      if (err.code === 3) return console.log(err); // TODO: server validation errors
      reject(err);
    });
  });
};

export default {
  getAnimes(opts, cb) {
    const req = new pb.AnimeListRequest();
    req.setOffset(opts.offset);
    req.setLimit(opts.limit);
    libraryClient.animeList(req, createMetadata()).on("data", anime => {
      cb(anime.toObject());
    });
  },
  getAnime(id) {
    const req = new pb.AnimeRequest();
    req.setId(id);
    return unaryCall(libraryClient.getAnime.bind(libraryClient), req);
  }
};
