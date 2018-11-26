import Vue from "vue";
import Vuex from "vuex";
import cookies from "js-cookie";

import router from "./router";

import profileService from "./services/profile";
//import authService from "./services/auth";

Vue.use(Vuex);

function initialState() {
  return {
    accessToken: cookies.get("access-token"),
    restored: false,
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
    setProfile: (state, profile) => {
      for (let k in profile) state.profile[k] = profile[k];
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
  getters: {},
  actions: {
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
