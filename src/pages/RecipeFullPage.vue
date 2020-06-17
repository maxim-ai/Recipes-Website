<template>

    <div>
        <RecipeFull
            :id="recipe.previewItems.id"
            :title="recipe.previewItems.title"
            :ready-in-minutes="recipe.previewItems.readyInMinutes"
            :image="recipe.previewItems.image"
            :aggregate-likes="recipe.previewItems.aggregateLikes"
            :vegetarian="recipe.previewItems.vegetarian"
            :vegan="recipe.previewItems.vegan"
            :gluten-free="recipe.previewItems.glutenFree"
            :ingredients="recipe.ingredients"
            :instructions="recipe.instructions"
            :numOfDiners="recipe.numOfDiners"
            :inFavorites="recipe.inFavorites"
            :watched="recipe.watched"
        />
    </div>

    
</template>

<script>
    import RecipeFull from "../components/RecipeFull";
    export default {
        name: "RecipeFullPage",
        components: {
            RecipeFull
        },
        data() {
            return {
                recipe: {},
            };
        },
        mounted(){
            this.getFullRecipe();
            this.watchRecipe();
        },
        methods:{
            async getFullRecipe(){
                let response;
                try{
                    response = await this.axios.get("http://localhost:3000/recipes/recipePage/recipeID/"+this.$route.params.recipeId);

                    if(window.$cookies.isKey('session'))
                    {
                        let id = "["+response.data.previewItems.id+"]";
                        const infos = await this.axios.get(
                            "http://localhost:3000/users/userRecipeInfo/" + id
                        );
                        // response.data.forEach(recipe => {
                            for (const [key, value] of Object.entries(infos.data)) {
                                if (response.data.previewItems.id == key) {
                                    response.data.watched = value.watched;
                                    response.data.inFavorites = value.inFavorites;
                                }
                            }
                        // });
                    }
                    this.recipe=response.data;
                }
                catch(error){
                    this.recipe=response.data;
                }
                
            },
            async watchRecipe(){
                if(window.$cookies.isKey('session'))
                {
                    let response = await this.axios.post("http://localhost:3000/users/watchRecipe",
                    {
                        recipeID:this.$route.params.recipeId
                    });
                    this.recipe=response.data;
                }
                
            }
        }
    }

</script>

<style scoped>

</style>