
<template>
    <div style="text-align:center" >
        <NavBar/>
        <h1 >Search recipes</h1>
        <input
                v-model="searchQuery"
                type="text"
                placeholder="Enter search query"
                required
        />
        <button @click="search">search</button>
        <br>
        <br>
        <b-form-group label="Number of results:">
            <b-form-radio-group
                    v-model="selectedNum"
                    :options="optionsNum"
                    name="radio-inline"
            ></b-form-radio-group>
        </b-form-group>

        <b-form-group label="Filter categories:">
            <b-form-select label="Street:" class="w-25" v-model="selectedCuisine" :options="optionsCuisine"></b-form-select>
            <!-- <br /> -->
            <b-form-select class="w-25" v-model="selectedDiet" :options="optionsDiet"></b-form-select>
            <!-- <br /> -->
            <b-form-select class="w-25" v-model="selectedIntolerance" :options="optionsIntolerance"></b-form-select>
        </b-form-group>

        <button @click="sortByMakingTime">Sort by making time</button>
        <button @click="sortByPopularity">Sort by popularity</button>
        <br>
        <br>
        <b-alert  v-model="showDismissibleAlert" variant="warning" dismissible style="text-align:center">
            No recipes found for the inserted query
        </b-alert>

        <RecipePreview style="float:left"
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
                showDismissibleAlert:false,
                selectedCuisine: null,
                optionsCuisine: [
                    { value: null, text: 'Please select an cuisine' },
                    { value: 'Italian', text: 'Italian' },
                    { value: 'Spanish', text: 'Spanish' },
                    { value: 'French', text: 'French' },
                ],
                selectedDiet: null,
                optionsDiet: [
                    { value: null, text: 'Please select an diet' },
                    { value: 'Vegetarian', text: 'Vegetarian' },
                    { value: 'Vegan', text: 'Vegan' },
                    { value: 'Gluten Free', text: 'Gluten Free' },
                ],
                selectedIntolerance: null,
                optionsIntolerance: [
                    { value: null, text: 'Please select an intolerance' },
                    { value: 'Dairy', text: 'Dairy' },
                    { value: 'Egg', text: 'Egg' },
                    { value: 'Peanut', text: 'Peanut' },
                ],
                selectedNum: '5',
                optionsNum: [
                    { text: '5', value: '5' },
                    { text: '10', value: '10' },
                    { text: '15', value: '15' }
                ],
                recipes: [],
                searchQuery:""
            };
        },
        methods:{
            async search(){
                let queryParams={};
                if(this.selectedCuisine!=null) queryParams.cuisine=this.selectedCuisine;
                if(this.selectedDiet!=null) queryParams.diet=this.selectedDiet;
                if(this.selectedIntolerance!=null) queryParams.intolerance=this.selectedIntolerance;

                let response = await this.axios.get(
                    "http://localhost:3000/recipes/search/query/" + this.searchQuery + "/numToShow/" + this.selectedNum, {
                        params: queryParams
                    }
                );
                if(response.data.message){
                    this.showDismissibleAlert=true;
                    this.recipes=[];
                }
                else{
                    this.showDismissibleAlert=false;
                    this.recipes = [];
                    this.recipes.push(...response.data);
                }
            },
            sortByMakingTime(){
                this.recipes.sort((a,b)=>{
                    return a.readyInMinutes-b.readyInMinutes;
                })
            },
            sortByPopularity(){
                this.recipes.sort((a,b)=>{
                    return b.aggregateLikes-a.aggregateLikes;
                })
            }
        }
    };
</script>

<style></style>
