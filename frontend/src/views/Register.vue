<template>
  <div class="main">
    <div class="header">
      <h1>{{$t('page.register.title')}}</h1>
      <a @click="() => $router.push('/')">{{$t('back-to-login')}}</a>
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
          :placeholder="$t('email')"
          v-model="model.email"
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
        <n3-input
          type="password"
          :placeholder="$t('password-conf')"
          v-model="model.password2"
          ></n3-input>
      </n3-form-item>
      <n3-form-item :label-col="0" :form-col="12">
        <n3-button type="info" @click.native="submit" style="width: 220px;">{{$t('button.create-account')}}</n3-button>
      </n3-form-item>
    </n3-form>
  </div>
</template>


<script>
import AuthService from "@/services/auth";

export default {
  data() {
    return {
      model: {
        username: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  },
  methods: {
    submit() {
      // TODO: FORM VALIDATION
      this.$refs.form.validateFields(result => {
        AuthService.register({
          username: this.model.username,
          password: this.model.password,
          email: this.model.email
        })
          .then(() => {
            this.n3Toast({
              text: this.$t("toast.account-created"),
              type: "success",
              placement: "top",
              closeOnClick: true
            });
          })
          .catch(err => {
            this.n3Toast({
              text: this.$t(err.message),
              type: "danger",
              placement: "top",
              closeOnClick: true
            });
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
.avatar {
  width: 110px;
  height: 110px;
  margin: auto;
  border-radius: 110px;
  background: darkgrey;
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
