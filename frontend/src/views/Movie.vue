<template>
  <div>
    <n3-aside placement="left" title="Title" ref="menu">
    </n3-aside>
    <div class="header">
      <div>
        <n3-button @click.native="toggleMenu">
          <n3-icon type="bars"></n3-icon>
        </n3-button>
      </div>
      <div class="brand">Hypertube</div>
      <div>
        <n3-button-group>
          <n3-button>
            <n3-icon type="search"></n3-icon>
          </n3-button>
          <n3-button>
            <n3-icon type="cog"></n3-icon>
          </n3-button>
          <n3-button @click.native="$store.commit('logout')">
            <n3-icon type="power-off"></n3-icon>
          </n3-button>
        </n3-button-group>
      </div>
    </div>
    <div>
      <transition-group name="fade" mode="out-in">
        <div class="card" v-for="anime of animes" :key="anime.id">
          <h1>{{anime.title}}</h1>
          <div class="card-thumb" :style="`background-image: url('${anime.thumbnail}')`"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import LibraryService from "@/services/library";
export default {
  data() {
    return {
      animes: []
    };
  },
  methods: {
    toggleMenu() {
      this.$refs.menu.open();
    },
    fetchAnimes(offset, limit) {
      let retrieved = 0;
      LibraryService.getAnimes({ offset, limit }, anime => {
        setTimeout(() => this.animes.push(anime), 200);
        if (++retrieved === limit) {
          setTimeout(() => this.fetchAnimes(offset + limit, limit), 100);
        }
      });
    }
  },
  mounted() {
    this.fetchAnimes(0, 10);
  }
};
</script>

<style scoped>
.header {
  padding: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand {
  font-size: 24px;
  font-family: arial;
  letter-spacing: 2px;
  font-weight: bold;
  text-transform: uppercase;
}
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
