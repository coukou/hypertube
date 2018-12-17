<template>
  <div>
    <transition-group name="fade" mode="out-in">
      <div class="card" v-for="anime of $store.getters.animes" :key="anime.id" @click="() => goto(anime.id)">
        <h1>{{anime.title}}</h1>
        <div class="card-thumb" :style="`background-image: url('${anime.thumbnail}')`"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import LibraryService from "@/services/library";
export default {
  methods: {
    fetchAnimes(offset, limit) {
      let retrieved = 0;
      LibraryService.getAnimes({ offset, limit }, anime => {
        setTimeout(() => this.$store.commit("addAnime", anime), 200);
        if (++retrieved === limit) {
          setTimeout(() => this.fetchAnimes(offset + limit, limit), 100);
        }
      });
    },
    goto(animeId) {
      this.$router.push(`/app/anime/${animeId}`);
    }
  },
  mounted() {
    this.fetchAnimes(0, 10);
  }
};
</script>

<style scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  width: 300px;
}
.card-thumb {
  height: 300px;
  width: 200px;
  margin: auto;
  background-size: contain;
  background-repeat: no-repeat;
}
.card > h1 {
  font-size: 20px;
  text-align: center;
}
</style>
