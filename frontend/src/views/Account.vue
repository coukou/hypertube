<template>
  <div>
    <account-edit-form></account-edit-form>
    <profile-edit-form></profile-edit-form>
  </div>
</template>

<script>
import ProfileEditForm from "@/components/EditProfileForm";
import AccountEditForm from "@/components/EditAccountForm";
export default {
  components: {
    ProfileEditForm,
    AccountEditForm
  }
};
</script>

<style>
</style>
