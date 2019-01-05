<template>
  <div class="main">
    <div class="header">
      <h1>{{$t('page.forgotten.title')}}</h1>
      <a @click="() => $router.push('/')">{{$t('back-to-login')}}</a>
    </div>
    <hr />
    <div>{{$t('page.forgotten.desc')}}</div>
    <br />
    <n3-form ref="form">
      <n3-form-item :label-col="0" :form-col="12">
        <n3-input
          :placeholder="$t('username')"
          v-model="model.username"
          ></n3-input>
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <n3-button type="info" @click.native="submit" style="width: 220px;">{{$t('button.reset-pass')}}</n3-button>
      </n3-form-item>
    </n3-form>
  </div>
</template>


<script>
import grpcWeb from "grpc-web";
import { AuthServiceClient } from "../protos/auth/auth_grpc_web_pb";
import { ResetRequest, Empty } from "../protos/auth/auth_pb";

const authService = new AuthServiceClient(
  "http://192.168.99.100:31380",
  null,
  null
);

export default {
  data() {
    return {
      model: {
        username: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validateFields(result => {
        const request = new ResetRequest();
        request.setUsername(this.model.username);

        authService.reset(request, {}, err => {
          if (err) {
            return this.n3Toast({
              text: this.$t(err.message),
              type: "danger",
              placement: "top",
              closeOnClick: true
            });
          }
          this.n3Toast({
            text:
              "Password reset. You'll recieve an email with your new password",
            type: "success",
            placement: "top",
            closeOnClick: true
          });
          return this.$router.push("/");
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
