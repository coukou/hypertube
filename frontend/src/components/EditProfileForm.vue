<template>
  <n3-form ref="form">
    <profile-avatar :avatar="$store.state.profile.avatar" :upload="true" />
      <n3-form-item :label-col="0" :form-col="12">
      <n3-input
        :placeholder="$t('last-name')"
        v-model="model.lastName"
        ></n3-input>
    </n3-form-item>
    <n3-form-item :label-col="0" :form-col="12">
      <n3-input
        :placeholder="$t('first-name')"
        v-model="model.firstName"
        ></n3-input>
    </n3-form-item>
    <n3-form-item :label-col="0" :form-col="12">
      <n3-button type="info" @click.native="submit" style="width: 220px;">{{ submitLabel || 'edit' }}</n3-button>
    </n3-form-item>
  </n3-form>
</template>


<script>
import ProfileAvatar from "./ProfileAvatar";
import profileService from "../services/profile";

export default {
  props: ["submit-label"],
  components: {
    ProfileAvatar
  },
  data() {
    return {
      errors: {
        lastName: [],
        firstName: []
      },
      model: {
        firstName: this.$store.state.profile.firstName,
        lastName: this.$store.state.profile.lastName
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validateFields(result => {
        this.errors = {
          lastName: [],
          firstName: []
        };
        profileService
          .edit(this.model)
          .then(res => {
            this.$store.commit(
              "setProfile",
              Object.assign(res.toObject(), { inited: true })
            );
            this.$emit("success", res);
          })
          .catch(err => {
            console.log(err);
            // TODO: handle server validation error ?
          });
      });
    }
  }
};
</script>
