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

export default {
  getAnimes(opts, cb) {
    const req = new pb.AnimeListRequest();
    req.setOffset(opts.offset);
    req.setLimit(opts.limit);
    libraryClient.animeList(req, createMetadata()).on("data", anime => {
      cb(anime.toObject());
    });
  }
};
