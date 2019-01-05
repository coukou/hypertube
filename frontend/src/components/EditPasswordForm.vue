<template>
  <n3-form ref="form">
    <n3-form-item :label-col="0" :form-col="12">
      <n3-input
           placeholder="Password"
           type="password"
           v-model="model.password"
           ></n3-input>
    </n3-form-item>
    <n3-modal title="Modal title" effect="fade" width="400px" ref="modal" @confirm="submit">
      <div slot="body">
        <n3-input
           placeholder="password"
           type="password"
           v-model="model.password2"
           ></n3-input>
      </div>
    </n3-modal>
    <n3-form-item :label-col="0" :form-col="12">
      <n3-button type="info" @click.native="passConfirm" style="width: 220px;">{{ submitLabel || $t('button.edit') }}</n3-button>
    </n3-form-item>
  </n3-form>
</template>


<script>
import authService from "../services/auth";

export default {
  props: ["submit-label"],
  data() {
    return {
      model: {
        password: "",
        password2: ""
      }
    };
  },
  methods: {
    passConfirm() {
      this.$refs.modal.open();
    },
    submit() {
      authService
        .editPassword({
          password: this.model.password,
          password2: this.model.password2
        })
        .then(() => {
          this.$store.commit("logout");
        })
        .catch(err => {
          if (err.code !== 7) return;
          this.n3Toast({
            text: this.$t(err.message),
            type: "danger",
            placement: "top",
            closeOnClick: true
          });
        });
    }
  }
};
</script>
