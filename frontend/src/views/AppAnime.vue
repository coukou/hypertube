<template>
  <div v-if="anime">
    <h1 class="title">{{ anime.title }}</h1>
    <div>thumbnail</div>
    <span class="synopsis">{{ anime.synopsis }}</span>
    <div v-for="episode of episodes" :key="episode.num">
      {{ episode.num }}
      <div v-for="q of episode.qualitiesList" :key="q.quality">
        <span>{{ q }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import LibraryService from "@/services/library";
export default {
  created() {
    this.fetchAnime(this.$route.params.id);
  },
  data() {
    return {
      anime: undefined
    };
  },
  methods: {
    fetchAnime(id) {
      LibraryService.getAnime(id).then(
        anime => (this.anime = anime.toObject())
      );
    }
  },
  computed: {
    episodes() {
      console.log(this.anime.episodesList);
      return this.anime.episodesList
        .slice()
        .sort((a, b) => parseInt(a.num) - parseInt(b.num));
    }
  }
};
</script>

<style>
</style>
