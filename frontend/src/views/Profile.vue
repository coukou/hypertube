<template>
  <loading-dots v-if="!profile"></loading-dots>
  <div v-else>
    <profile-avatar :avatar="profile.avatar"></profile-avatar>
    <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
  </div>
</template>

<script>
import ProfileAvatar from "@/components/ProfileAvatar";
import LoadingDots from "@/components/LoadingDots";
import profileService from "@/services/profile";

export default {
  components: {
    ProfileAvatar,
    LoadingDots
  },
  data() {
    return {
      profile: undefined
    };
  },
  created() {
    this.fetchProfile(this.$route.params.id);
  },
  methods: {
    fetchProfile(id) {
      this.$store
        .dispatch("getProfile", id)
        .then(profile => {
          this.profile = profile.toObject();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
