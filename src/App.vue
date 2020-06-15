<template>
  <div id="app">


    <NavBar :cookiebla=hasCookie />
<!--    <MainPage />-->
    <router-view />

  </div>
</template>

<script>
// import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  },
  data(){
    return{
      hasCookie: false
    }
  },
  mounted(){
    this.checkCookieAfterRefresh();
  },
  methods:{
    onChildClick(value){
      this.hasCookie=value;
    },
    checkCookieAfterRefresh(){
      this.hasCookie=window.$cookies.isKey('session');
    }
  }
};
</script>

<style lang="scss">
// @import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
