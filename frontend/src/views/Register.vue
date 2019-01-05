<template>
  <div class="main">
    <div class="header">
      <h1>{{$t('page.register.title')}}</h1>
      <a @click="() => $router.push('/')">{{$t('back-to-login')}}</a>
      <hr />
    </div>
    <n3-form class="omni-form" ref="form">
      <n3-form-item v-for="(field, key) of model" :label-col="0" :form-col="12" :key="key">
        <n3-input
          :placeholder="$t(key)"
          v-model="model[key]"
          :type="key.includes('password') ? 'password' : 'text'"
          ></n3-input>
        <div class="n3-err-tip" v-for="(error, i) of errors[key]" :key="i">
          {{ $t(error) }}
        </div>
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
      },
      errors: {
        username: [],
        email: [],
        password: [],
        password2: []
      }
    };
  },
  methods: {
    clearErrors() {
      Object.keys(this.errors).forEach(k => {
        this.errors[k] = [];
      });
    },
    submit() {
      this.clearErrors();
      if (this.model.password !== this.model.password2) {
        this.errors.password.push("err.field.doesnt_match");
        this.errors.password2.push("err.field.doesnt_match");
        return;
      }
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
            if (err.code !== 3) return;
            const errors = JSON.parse(err.message);
            errors.forEach(error => {
              this.errors[error.field].push(error.message);
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
