<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Babushka recipes</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>


      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item  to="/" >MainPage</b-nav-item>
          <b-nav-item to="/search" tag="a">Search</b-nav-item>
          <b-nav-item href="#">About</b-nav-item>
          <b-navbar-brand  v-if="!this.cookiebla">Hello Guest</b-navbar-brand>
          <b-nav-item  to="/" v-if="!this.cookiebla">Login</b-nav-item>
          <b-nav-item  to="/register" v-if="!this.cookiebla">Register</b-nav-item>
          <b-nav-item   v-if="this.cookiebla">Yossi</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>

          </b-nav-item-dropdown>

          <b-nav-item-dropdown  v-if="this.cookiebla" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Personal</em>
            </template>
            <b-dropdown-item to="/favorites">My Favorites</b-dropdown-item>
            <b-dropdown-item to="/personal">My Recipes</b-dropdown-item>
            <b-dropdown-item to="/family">My Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data(){

  },
  mounted() {
    this.updateCookie();
  },
  props:{
    cookiebla: {
      type: Boolean,
      required: true
    },
  },
  methods:{
    updateCookie(){
      // Add the component back in
    }
  },
};
</script>

<style></style>
