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

const unaryCall = (method, metadata, req) => {
  return new Promise((resolve, reject) => {
    method(req, metadata, (err, data) => {
      if (!err) return resolve(data);
      if (err.code === 3) return console.log(err); // TODO: server validation errors
      // error 7 is permission denied
      if (err.code === 7) return store.commit("logout");
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
  searchAnime(name, cb) {
    const req = new pb.AnimeSearchRequest();
    req.setName(name);
    libraryClient.searchAnime(req, createMetadata()).on("data", anime => {
      cb(anime.toObject());
    });
  },
  getAnime(id) {
    const req = new pb.AnimeRequest();
    req.setId(id);
    return unaryCall(
      libraryClient.getAnime.bind(libraryClient),
      createMetadata(),
      req
    );
  },
  animeCount() {
    const req = new pb.Empty();
    return unaryCall(
      libraryClient.animeCount.bind(libraryClient),
      createMetadata(),
      req
    );
  },
  getComments(opts, cb) {
    const req = new pb.CommentListRequest();
    req.setAnime(opts.anime);
    req.setEpisode(opts.episode);
    libraryClient.commentList(req, createMetadata()).on("data", comment => {
      cb(comment.toObject());
    });
  },
  commentEpisode(anime, episode, comment) {
    const req = new pb.CommentRequest();
    req.setAnime(anime);
    req.setEpisode(episode);
    req.setComment(comment);
    return unaryCall(
      libraryClient.commentEpisode.bind(libraryClient),
      createMetadata(),
      req
    );
  }
};
