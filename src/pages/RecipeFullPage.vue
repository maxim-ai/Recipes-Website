<template>

    <div>
        <RecipeFull
            :id="recipe.id"
            :title="recipe.title"
            :ready-in-minutes="recipe.readyInMinutes"
            :image="recipe.image"
            :aggregate-likes="recipe.aggregateLikes"
            :vegetarian="recipe.vegetarian"
            :vegan="recipe.vegan"
            :gluten-free="recipe.glutenFree"
            :in-favorites="recipe.inFavorites"
            :watched="recipe.watched"
            :ingredients="recipe.ingredients"
            :instructions="recipe.instructions"
        />
    </div>

    
</template>

<script>
    import RecipeFamily from "../components/RecipeFull";
    export default {
        name: "RecipeFullPage",
        components: {
            RecipeFull
        },
        data() {
            return {
                recipes: null,
            };
        },
        mounted(){
            this.getFullRecipe();
        },
        methods:{
            async getFullRecipe(){
                this.axios.defaults.withCredentials = true;
                let response = await this.axios.post("http://localhost:3000/recipePage/recipeID/"+this.$route.params.recipeId);
                this.recipe=response.data;
            }
        }
    }

</script>

<style scoped>

</style>