<template>
  <div>
    <div class="header">
      <div>
      </div>
      <div class="brand">
        <router-link to="/app">MangaTube</router-link>
      </div>
      <div>
        <n3-button-group>
          <n3-button @click.native="$router.push('/app/account')">
            <n3-icon type="cog"></n3-icon>
          </n3-button>
          <n3-button @click.native="$store.commit('logout')">
            <n3-icon type="power-off"></n3-icon>
          </n3-button>
        </n3-button-group>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <hr />
    <div>
      <center>copyright &copy; 2018 - MangaTube</center>
    </div>
  </div>
</template>

<script>
export default {};
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
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  height: 100%;
}
</style>
