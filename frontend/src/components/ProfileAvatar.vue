<template>
  <div>
    <div class="avatar" :style="`background-image: url(${avatarUrl})`"></div>
    <n3-uploader v-if="upload"
      class="upload-button"
      :multiple="false"
      accept="image/png"
      @error="onError"
      @success="onSuccess"
      :url="uploadUrl"
    ></n3-uploader>
  </div>
</template>

<script>
export default {
  props: ["avatar", "upload"],
  computed: {
    avatarUrl() {
      const avatar = this.avatar;
      const [type, data] = avatar.split(/:(.+)/);
      if (type === "ext") return data;
      return `http://192.168.99.100:31380/avatar/${data}`;
    },
    uploadUrl() {
      return `http://192.168.99.100:31380/avatar/?at=${
        this.$store.getters.accessToken
      }`;
    }
  },
  methods: {
    onSuccess(res) {
      this.$store.commit("setAvatar", res.response.avatar);
    },
    onError(err) {
      console.log("error!", err);
    }
  }
};
</script>

<style scoped>
.upload-button {
  padding: 10px 0;
}
.avatar {
  margin: 20px auto;
  width: 128px;
  height: 128px;
  border-radius: 100px;
  background-size: cover;
  background-position: 50% 50%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
}
</style>
