<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item router-link :to="{ name: 'main' }">Vue Recipes</b-nav-item>
        <b-nav-item router-link :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item router-link :to="{ name: 'register' }">About</b-nav-item>

        <!-- {{ !$root.store.username }} -->
        <template v-if="!$root.store.username">
          <b-nav-item router-link :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item router-link :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-text ><span class="nav-text">Hello Guest</span></b-nav-text>
        </template>

        <template v-else>
            <!-- <b-nav-text><span class="nav-text">Hello {{ $root.store.username }}</span></b-nav-text> -->
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{$root.store.username}}</em>
            </template>
            <b-dropdown-item href="#">My recipes</b-dropdown-item>
            <b-dropdown-item href="#">My favorits recipes</b-dropdown-item>
            <b-dropdown-item href="#">My family recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button pill variant="outline-secondary" @click="Logout" >Logout</b-button>
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
        //this.$forceUpdate();
        location.reload();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #232b27;
//   min-height: 100vh;
// }

.nav-text{
  font-size:medium;
  margin: 5px;
  color: black;
}


</style>
