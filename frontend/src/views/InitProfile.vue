<template>
  <div class="main">
    <div class="header">
      <h1>{{$t('page.app.new.title')}}</h1>
      <a @click="$store.commit('logout')">{{$t('back-to-login')}}</a>
      <hr />
    </div>
    <edit-profile-form :submit-label="$t('button.lets-go')" @success="() => $router.replace('/app')" />
  </div>
</template>


<script>
import EditProfileForm from "../components/EditProfileForm";

export default {
  components: {
    EditProfileForm
  },
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
