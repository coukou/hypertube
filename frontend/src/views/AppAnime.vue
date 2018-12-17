<template>
  <div>
    <h1 class="title">{{ anime.title }}</h1>
    <div>thumbnail</div>
    <span class="synopsis">{{ anime.synopsis }}</span>
    <div v-for="episode of episodes" :key="episode.num">
      {{ episode.num }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anime: this.$store.getters.animeById(this.$route.params.id)
    };
  },
  computed: {
    /*anime() {
      return this.$store.getters.animeById(this.$route.params.id);
    },*/
    episodes() {
      return this.anime.episodesList
        .slice()
        .sort((a, b) => parseInt(a.num, 10) > parseInt(b.num, 10));
    }
  }
};
</script>

<style>
</style>
