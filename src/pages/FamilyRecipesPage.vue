<template>

    <div>
        <NavBar></NavBar>
        <RecipeFamily
                v-for="r in recipes"
                :id="r.id"
                :title="r.title"
                :family-member="r.familyMember"
                :image="r.image"
                :special-occasion="r.specialOccasion"
                :ingredients="r.ingredients"
                :instructions="r.instructions"
                :key="r.id"
        />
    </div>

    
</template>

<script>
    import RecipeFamily from "../components/RecipeFamily";
    import NavBar from "../components/NavBar";
    export default {
        name: "FamilyRecipesPage",
        components: {
            RecipeFamily,
            NavBar
        },
        data() {
            return {
                recipes: [],
            };
        },
        mounted(){
            this.getFamilyRecipes();
        },
        methods:{
            async getFamilyRecipes(){
                this.axios.defaults.withCredentials = true;
                await this.axios.post("http://localhost:3000/auth/login", {
                    username: "seanav",
                    password: "s1234!"
                });
                let response = await this.axios.get(
                    "http://localhost:3000/users/familyRecipes"
                );
                this.recipes=[];
                this.recipes.push(...response.data);
            }
        }
    }

</script>

<style scoped>

</style>