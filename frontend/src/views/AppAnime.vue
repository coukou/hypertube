<template>
  <div v-if="anime">
    <anime-card
      style="display:block;margin:auto;"
      :title="anime.title"
      :thumb="anime.thumbnail"
    ></anime-card>
    <div>
      <h2>synopsis</h2>
      <div class="synopsis">{{ anime.synopsis }}</div>
    </div>
    <div>
      <h2>episodes</h2>
      <div class="episode" v-for="(episode, key) of episodes" :key="key">
        <span>episode {{ episode.num }}</span>
        <span class="quality" v-for="q of episode.qualitiesList" :key="q.quality">
          <n3-button @click.native="() => watch(anime.id, episode.num, q)">{{ q }}p</n3-button>
        </span>
      </div>
    </div>
  </div>
  <loading-dots v-else></loading-dots>
</template>

<script>
import AnimeCard from "@/components/AnimeCard";
import LoadingDots from "@/components/LoadingDots";
import LibraryService from "@/services/library";
export default {
  components: {
    AnimeCard,
    LoadingDots
  },
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
      this.$store
        .dispatch("getAnime", id)
        .then(anime => (this.anime = anime.toObject()));
    },
    watch(animeId, episode, quality) {
      this.$router.push(`/app/anime/watch/${animeId}/${episode}/${quality}`);
    },
  },
  computed: {
    episodes() {
      return this.anime.episodesList
        .slice()
        .sort((a, b) => parseInt(b.num) - parseInt(a.num));
    }
  }
};
</script>

<style scoped>
.episode {
  padding: 5px 0;
}
.quality {
  padding: 0 5px;
}
</style>
