<template>
  <div class="main">
    <div class="header">
      <h1>
        MangaTube
      </h1>
      <hr />
    </div>
    <n3-form class="omni-form" ref="form">
      <n3-form-item :label-col="0" :form-col="12">
        <n3-input
          :placeholder="$t('username')"
          v-model="model.username"
          ></n3-input>
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <n3-input
          type="password"
          :placeholder="$t('password')"
          v-model="model.password"
          ></n3-input>
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <n3-button type="info" @click.native="submit" style="width: 220px;">{{$t("button.auth")}}</n3-button>
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <a @click="() => $router.push('forgot')">{{$t("forgotten-link")}}</a>
        <hr />
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <n3-button style="width: 220px;" @click.native="auth42">
          <img class="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/1024px-42_Logo.svg.png" height="14px" />
          <span>42 Auth</span>
        </n3-button>
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <n3-button style="width: 220px;" @click.native="authGithub">
          <n3-icon class="icon" type="github"></n3-icon>
          <span>Github Auth</span>
        </n3-button>
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <n3-button @click.native="() => $router.push('/register')" style="width: 220px;">
          <span>{{$t("button.create-account")}}</span>
        </n3-button>
      </n3-form-item>
    </n3-form>
      <hr />
      <lang-radio />
  </div>
</template>


<script>
import LangRadio from "../components/LangRadio.vue";

import grpcWeb from "grpc-web";
import { AuthServiceClient } from "../protos/auth/auth_grpc_web_pb";
import { AuthRequest, Empty } from "../protos/auth/auth_pb";

const authService = new AuthServiceClient(
  "http://192.168.99.100:31380",
  null,
  null
);

export default {
  components: {
    LangRadio
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    auth42() {
      window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=916b137155359d60f07ad232302d09674851ca9ed68041fbaf5afcfa72135d84&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2F42%2F&response_type=code`;
    },
    authGithub() {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=88c839de63c8690b4908&redirect_uri=http://localhost:8080/oauth/github/&scope=user`;
    },
    submit() {
      this.$refs.form.validateFields(() => {
        const request = new AuthRequest();
        request.setUsername(this.model.username);
        request.setPassword(this.model.password);

        authService.auth(request, {}, (err, response) => {
          if (err) {
            return this.n3Toast({
              text: this.$t(err.message),
              type: "danger",
              placement: "top",
              closeOnClick: true
            });
          }
          this.$store.commit("authed", response.getToken());
        });
      });
    }
  }
};
</script>

<style scoped>
.icon {
  margin-right: 5px;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}
hr {
  width: 220px;
}
</style>
