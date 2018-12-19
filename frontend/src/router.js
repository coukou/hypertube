import Vue from "vue";
import Router from "vue-router";

import store from "./store";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/validate/:token",
      name: "validate",
      component: () =>
        import(/* webpackChunkName: "validate" */ "./views/Validate.vue")
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () =>
        import(/* webpackChunkName: "forgot" */ "./views/Forgotten.vue")
    },
    {
      path: "/oauth/:type",
      name: "oauth",
      component: () =>
        import(/* webpackChunName: "oauth" */ "./views/OAuth.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/app",
      component: () =>
        import(/* webpackChunkName: "ht-app" */ "./views/App.vue"),
      children: [
        {
          path: "/",
          name: "ht-app-movie-list",
          component: () =>
            import(/* webpackChunkName: "ht-app-movie-list" */ "./views/AppMovieList.vue")
        },
        {
          path: "account",
          name: "ht-app-account",
          component: () =>
            import(/* webpackChunkName: "ht-app-account" */ "./views/Account.vue")
        },
        {
          path: "profile/:id",
          name: "ht-app-profile",
          component: () =>
            import(/* webpackChunkName: "ht-app-profile" */ "./views/Profile.vue")
        },
        {
          path: "anime/:id",
          name: "ht-app-anime",
          component: () =>
            import(/* webpackChunkName: "ht-app-anime" */ "./views/AppAnime.vue")
        }
      ]
    },
    {
      path: "/app/new",
      name: "new-profile",
      beforeEnter(to, from, next) {
        if (store.state.profile.inited) return next("/app");
        next();
      },
      component: () =>
        import(/* webpackChunkName: "new-profile" */ "./views/InitProfile.vue")
    },
    {
      path: "*",
      beforeEnter: (to, from, next) => {
        next(from);
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (RegExp("/app.*").test(to.path)) {
    if (store.state.accessToken === undefined) {
      return next("/");
    }
    if (!store.state.restored) {
      await store.dispatch("restore");
    }
    if (!store.state.profile.inited && to.path !== "/app/new") {
      return next("/app/new");
    }
  } else if (store.state.accessToken) {
    return next("/app");
  }
  next();
});

export default router;
