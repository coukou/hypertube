<template>
  <div class="container">
    <loading-dots />
      <div class="message">{{$t('retrieving-oauth-info')}}</div>
  </div>
</template>

<script>
import LoadingDots from "@/components/LoadingDots";
import AuthService from "@/services/auth";

export default {
  components: {
    LoadingDots
  },
  mounted() {
    const { code } = this.$route.query;
    if (!code) {
      return this.$router.replace("/");
    }
    AuthService.oauth({ type: this.$route.params.type, code })
      .then(data => this.$store.commit("authed", data.getToken()))
      .catch(err => {
        this.n3Toast({
          text: err.message,
          type: "danger",
          placement: "top",
          closeOnClick: true
        });
        this.$router.replace("/");
      });
  }
};
</script>

<style scoped>
.message {
  margin-top: 20px;
}
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
