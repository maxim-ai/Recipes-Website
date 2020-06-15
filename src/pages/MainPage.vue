<template>
  <div >
    <div class="column">
      <RecipePreview
        v-for="r in recipes"
        :id="r.id"
        :title="r.title"
        :ready-in-minutes="r.readyInMinutes"
        :image="r.image"
        :aggregate-likes="r.aggregateLikes"
        :vegetarian="r.vegetarian"
        :vegan="r.vegan"
        :gluten-free="r.glutenFree"
        :in-favorites="r.inFavorites"
        :watched="r.watched"
        :key="r.id"
      />
      <button @click="updateRecipes">Refresh</button>
    </div>
    <div class="column">
      <Login @clicked="getLastWatched" v-if="!hasCookie" style="position: absolute; top: 30%;" />
      <RecipePreview v-else v-for="r in watchedRecipes"
        :id="r.id"
        :title="r.title"
        :ready-in-minutes="r.readyInMinutes"
        :image="r.image"
        :aggregate-likes="r.aggregateLikes"
        :vegetarian="r.vegetarian"
        :vegan="r.vegan"
        :gluten-free="r.glutenFree"
        :in-favorites="r.inFavorites"
        :watched="r.watched"
        :key="r.id" />
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import Login from "../components/Login";
import RecipeFull from "../components/RecipeFull";
import VueCookies from 'vue-cookies';

export default {
  components: {
    RecipePreview,
    Login,
    // RecipeFull,
  },
  data() {
    return {
      recipes: [],
      recipeChosen: {},
      hasCookie:false,
      watchedRecipes: []
    };
  },
  mounted() {
    this.updateRecipes();
    this.checkCookieAfterRefresh();
    this.getLastWatched(true);
  },
  methods: {
    async updateRecipes() {
      let response;
      try {
        this.axios.defaults.withCredentials = true;

        response = await this.axios.get(
          "http://localhost:3000/recipes/getThreeRandomRecipes"
        );

        this.recipes = [];
        let ids = "[";
        response.data.forEach(recipe => {
          ids = ids + recipe.id + ",";
        });
        ids = ids.substring(0, ids.length - 1) + "]";
        const infos = await this.axios.get(
          "http://localhost:3000/users/userRecipeInfo/" + ids
        );
        console.log(infos);
        response.data.forEach(recipe => {
          for (const [key, value] of Object.entries(infos.data)) {
            if (recipe.id == key) {
              recipe.watched = value.watched;
              recipe.inFavorites = value.inFavorites;
            }
          }
        });
        this.recipes.push(...response.data);
      } catch (error) {
        this.recipes.push(...response.data);
      }
    },
    async getLastWatched(value){
      this.axios.defaults.withCredentials = true;

      let response = await this.axios.get(
              "http://localhost:3000/users/lastWatchedRecipes"
      );
      this.watchedRecipes.push(...response.data);
    },
    checkCookieAfterRefresh(){
      this.hasCookie=window.$cookies.isKey('session');
    }

  }
};
</script>

<style scoped>
.column {
  float: left;
  width: 50%;
  padding: 10px;
}

* {
  box-sizing: border-box;
}

.row {
  display: flex;
}
</style>
