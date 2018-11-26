<template>
  <div class="avatar" :style="`background-image: url(${avatarUrl})`"></div>
</template>

<script>
export default {
  props: ["avatar"],
  computed: {
    avatarUrl() {
      const [type, data] = this.avatar.split(/:(.+)/);
      if (type === "ext") return data;
      return "";
    }
  }
};
</script>

<style scoped>
.avatar {
  margin: 20px auto;
  width: 128px;
  height: 128px;
  border-radius: 100px;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
