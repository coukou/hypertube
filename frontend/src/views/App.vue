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
  </div>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      this.$refs.menu.open();
    }
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
</style>
