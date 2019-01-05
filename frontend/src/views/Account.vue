<template>
  <div>
    <profile-edit-form></profile-edit-form>
    <hr />
    <email-edit-form></email-edit-form>
    <hr />
    <password-edit-form></password-edit-form>
    <hr />
    <lang-radio></lang-radio>
  </div>
</template>

<script>
import LangRadio from "@/components/LangRadio";
import ProfileEditForm from "@/components/EditProfileForm";
import EmailEditForm from "@/components/EditEmailForm";
import PasswordEditForm from "@/components/EditPasswordForm";
export default {
  components: {
    LangRadio,
    ProfileEditForm,
    EmailEditForm,
    PasswordEditForm
  }
};
</script>

<style>
</style>
