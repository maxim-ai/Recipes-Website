<template>
  <div >
    <NavBar></NavBar>
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
      <Login style="position: absolute; top: 30%;" />
      <!-- <RecipeFull
        :id="recipeChosen.previewItems.id"
        :title="recipeChosen.previewItems.title"
        :ready-in-minutes="recipeChosen.previewItems.readyInMinutes"
        :image="recipeChosen.previewItems.image"
        :aggregate-likes="recipeChosen.previewItems.aggregateLikes"
        :vegetarian="recipeChosen.previewItems.vegetarian"
        :vegan="recipeChosen.previewItems.vegan"
        :gluten-free="recipeChosen.previewItems.glutenFree"
        :ingredients="recipeChosen.ingredients"
        :instructions="recipeChosen.instructions"
        :num-of-diners="recipeChosen.numOfDiners"
        :key="recipeChosen.id"
      /> -->
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import Login from "../components/Login";
import RecipeFull from "../components/RecipeFull";
import VueCookies from 'vue-cookies';
// import Vue from 'vue';

// var Vue = require('vue');
// Vue.use(require('vue-cookies'));
// Vue.use(VueCookies);
// Vue.$cookies.config('7d')

export default {
  components: {
    RecipePreview,
    Login,
    // RecipeFull,
  },
  data() {
    return {
      recipes: [],
      recipeChosen: {}
    };
  },
  mounted() {
    this.updateRecipes();
    // this.getFullRecipe(492560);
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
        let d=window.$cookies.isKey('session');
        await this.axios.post("http://localhost:3000/auth/login", {
          username: "seanav",
          password: "s1234!"
        });
        // window.$cookies.set('blabla');
        // let b=window.$cookies.isKey('blabla');
        let c=window.$cookies.isKey('session');
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
    async getFullRecipe(recipe_id) {
      let response = await this.axios.get(
        "http://localhost:3000/recipes/recipePage/recipeID/" + recipe_id
      );
      this.recipeChosen = response.data;
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
