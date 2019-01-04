<template>
  <div>
    <transition-group name="fade" mode="out-in">
      <anime-card v-for="anime of $store.getters.animes"
        :key="anime.id"
        :title="anime.title"
        :thumb="anime.thumbnail"
        @click.native="() => goto(anime.id)"
      ></anime-card>
    </transition-group>
  </div>
</template>

<script>
import AnimeCard from "@/components/AnimeCard";
import LibraryService from "@/services/library";
export default {
  components: {
    AnimeCard
  },
  methods: {
    fetchAnimes(offset, limit) {
      LibraryService.getAnimes({ offset, limit }, anime => {
        setTimeout(() => this.$store.commit("addAnime", anime), 200);
      });
    },
    goto(animeId) {
      this.$router.push(`/app/anime/${animeId}`);
    }
  },
  mounted() {
    this.fetchAnimes(0, 10);
    this.fetchAnimes(695, 10);
  }
};
</script>
