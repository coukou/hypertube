<template>
  <n3-form ref="form">
    <n3-form-item :label-col="0" :form-col="12">
      <n3-input
           placeholder="Email"
           v-model="model.email"
           ></n3-input>
    </n3-form-item>
    <n3-modal title="Modal title" effect="fade" width="400px" ref="modal" @confirm="submit">
      <div slot="body">
        <n3-input
           placeholder="password"
           type="password"
           v-model="model.password"
           ></n3-input>
      </div>
    </n3-modal>
    <n3-form-item :label-col="0" :form-col="12">
      <n3-button type="info" @click.native="passConfirm" style="width: 220px;">{{ submitLabel || 'edit' }}</n3-button>
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
        email: this.$store.getters.account.email,
        password: ""
      }
    };
  },
  methods: {
    passConfirm() {
      this.$refs.modal.open();
    },
    submit() {
      authService
        .editEmail({ email: this.model.email, password: this.model.password })
        .then(() => {
          this.$store.commit("logout");
        })
        .catch(err => {
          console.log(err);
          // TODO: handle server validation error ?
        });
    }
  }
};
</script>
