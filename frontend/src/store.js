import Vue from "vue";
import Vuex from "vuex";
import cookies from "js-cookie";

import router from "./router";

import profileService from "./services/profile";
import libraryService from "./services/library";
//import authService from "./services/auth";

Vue.use(Vuex);

function parseJWT(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}

function initialState() {
  return {
    cache: {
      profiles: {},
      animes: {}
    },
    accessToken: cookies.get("access-token"),
    restored: false,
    movies: {
      animes: [],
      films: []
    },
    profile: {
      lastName: undefined,
      firstName: undefined,
      inited: false,
      avatar: undefined
    }
  };
}

export default new Vuex.Store({
  state: initialState(),
  mutations: {
    authed: (state, token) => {
      state.accessToken = token;
      cookies.set("access-token", token);
      router.push("/app");
    },
    setRestored: (state, v) => {
      state.restored = v;
    },
    addAnime: (state, anime) => {
      if (state.movies.animes.findIndex(a => a.id === anime.id) >= 0) return;
      state.movies.animes.push(anime);
    },
    setProfile: (state, profile) => {
      for (let k in profile) state.profile[k] = profile[k];
    },
    setAvatar: (state, avatar) => {
      state.profile.avatar = avatar;
    },
    logout: state => {
      cookies.remove("access-token");

      // we reset application state
      const s = initialState();
      Object.keys(s).forEach(k => {
        state[k] = s[k];
      });

      // redirect user to root
      router.push("/");
    }
  },
  getters: {
    account: state => {
      if (!state.accessToken) return;
      const data = parseJWT(state.accessToken);
      return {
        id: data._id,
        username: data.username,
        email: data.email
      };
    },
    accessToken: state => {
      return state.accessToken;
    },
    animes: state => {
      return state.movies.animes;
    },
    profile: state => {
      return state.profile;
    },
    animeById: state => id => {
      return state.movies.animes.find(a => a.id === id);
    }
  },
  actions: {
    getProfile: (store, id) => {
      const cache = store.state.cache;
      return new Promise((resolve, reject) => {
        if (cache.profiles[id]) return resolve(cache.profiles[id]);
        profileService.profile(id).then(profile => {
          cache.profiles[id] = profile;
          resolve(profile);
        });
      });
    },
    getAnime: (store, id) => {
      const cache = store.state.cache;
      return new Promise((resolve, reject) => {
        if (cache.animes[id]) return resolve(cache.animes[id]);
        libraryService.getAnime(id).then(anime => {
          cache.animes[id] = anime;
          resolve(anime);
        });
      });
    },
    restore: store => {
      return new Promise(resolve => {
        if (store.state.restored) return resolve();
        profileService
          .myProfile()
          .then(profile => {
            store.commit("setProfile", profile.toObject());
            store.commit("setRestored", true);
            resolve();
          })
          .catch(err => {
            if (err.code !== 7) return console.log("unexpected error:", err);
            return store.commit("logout");
          });
      });
    }
  }
});
