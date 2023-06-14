<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item router-link :to="{ name: 'main' }">Vue Recipes</b-nav-item>
        <b-nav-item router-link :to="{ name: 'search' }">Search</b-nav-item>

        <!-- {{ !$root.store.username }} -->
        <template v-if="!$root.store.username">
          <b-nav-text><span class="nav-text">(Guest)</span></b-nav-text>
          <b-nav-item router-link :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item router-link :to="{ name: 'login' }">Login</b-nav-item>
        </template>

        <template v-else>
          {{ $root.store.username }}: <b-button @click="Logout">Logout</b-button>
        </template>  
      </b-navbar-nav>
    </b-navbar>
    <router-view /> 
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #232b27;
  min-height: 100vh;
}

.nav-text{
  font-size:small;
  margin-left: 5px;
  color: #3d4944;
}
</style>
