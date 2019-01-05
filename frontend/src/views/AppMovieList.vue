<template>
  <div>
    <div>
      <n3-input v-model="searchInput" ref="input"></n3-input>
      <n3-button @click.native="search">{{ $t('button.search') }}</n3-button>
      <n3-button @click.native="clear">{{ $t('button.clear_search') }}</n3-button>
    </div>
    <transition-group name="fade" mode="out-in">
      <anime-card v-for="anime of animes"
        :key="anime.id"
        :title="anime.title"
        :thumb="anime.thumbnail"
        @click.native="() => goto(anime.id)"
      ></anime-card>
    </transition-group>
    <hr />
    <div>
      <n3-page :total="animeCount" :pagesize="10" @change="pagechange" v-model="page"></n3-page>
    </div>
  </div>
</template>

<script>
import AnimeCard from "@/components/AnimeCard";
import LibraryService from "@/services/library";
export default {
  components: {
    AnimeCard
  },
  data() {
    return {
      animes: [],
      animeCount: 0,
      page: 1,
      searchInput: undefined
    };
  },
  methods: {
    fetchAnimeCount() {
      LibraryService.animeCount().then(res => {
        this.animeCount = res.toObject().count;
      });
    },
    fetchAnimes(offset, limit) {
      this.animes = [];
      LibraryService.getAnimes({ offset, limit }, anime => {
        setTimeout(() => this.animes.push(anime), 200);
      });
    },
    pagechange(page) {
      this.fetchAnimes((page - 1) * 10, 10);
    },
    clear() {
      this.page = 1;
      this.fetchAnimes(0, 10);
    },
    search() {
      this.animes = [];
      LibraryService.searchAnime(this.searchInput, anime => {
        setTimeout(() => this.animes.push(anime), 200);
      });
    },
    goto(animeId) {
      this.$router.push(`/app/anime/${animeId}`);
    }
  },
  mounted() {
    this.fetchAnimeCount();
    this.fetchAnimes(0, 10);
  }
};
</script>
