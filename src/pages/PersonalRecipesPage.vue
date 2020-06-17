<template>
    <div style="text-align:center">
        <h1>Personal Recipes</h1>
        <br>
        <br>
        <RecipePreview style="float:left;"
                v-for="r in recipes"
                :id="r.id"
                :title="r.title"
                :ready-in-minutes="r.readyInMinutes"
                :image="r.image"
                :aggregate-likes="r.aggregateLikes"
                :vegetarian="r.vegetarian"
                :vegan="r.vegan"
                :gluten-free="r.glutenFree"
                :key="r.id"
        />
    </div>
</template>

<script>
    import RecipePreview from "../components/RecipePreview";
    export default {
        components: {
            RecipePreview
        },
        data() {
            return {
                recipes: [],
                recipeChosen: {}
            };
        },
        mounted() {
            this.getFavorites();
        },
        methods:{
            async getFavorites(){
                let response;
                try {
                    this.axios.defaults.withCredentials = true;

                    response = await this.axios.get(
                        "http://localhost:3000/users/personalRecipes"
                    );
                    this.recipes=[];
                    this.recipes.push(...response.data);
                } catch (error) {
                    this.recipes.push(...response.data);
                }
            }
        }
    }
</script>

<style scoped>

</style>