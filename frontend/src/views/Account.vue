<template>
  <div>
    <profile-edit-form></profile-edit-form>
    <hr />
    <account-edit-form></account-edit-form>
    <hr />
    <lang-radio></lang-radio>
  </div>
</template>

<script>
import LangRadio from "@/components/LangRadio";
import ProfileEditForm from "@/components/EditProfileForm";
import AccountEditForm from "@/components/EditAccountForm";
export default {
  components: {
    LangRadio,
    ProfileEditForm,
    AccountEditForm
  }
};
</script>

<style>
</style>
