<template>
    <div class="recipe-preview">
        <div class="recipe-image">
            <img :src="image" width="500" height="500">
        </div>
        <div class="recipe-body">
            <ul class="recipe-overview">
                <li>title: {{ title }}</li>
                <li>familyMember: {{ familyMember }}</li>
                <li>specialOccasion: {{ specialOccasion }}</li>
                <li>ingrediants:</li>
                <ul v-for="i in ingredients" :key="i.ingredient_name">
                    <li>
                        <ul>
                            <li>name: {{ i.ingredient_name }}</li>
                            <li>amount: {{ i.amount }}</li>
                            <li>unit: {{ i.unit }}</li>
                        </ul>
                    </li>
                </ul>
                <li>instructions:</li>
                <ul v-for="i in instructions" :key="i.instructionNum">
                    <li>
                        <ul>
                            <li>number: {{ i.instructionNum }}</li>
                            <li>content: {{ i.instructionCont }}</li>
                        </ul>
                    </li>
                </ul>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            familyMember: {
                type: String,
                required: true
            },
            specialOccasion: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            ingredients: {
                typr: Array,
                required: true
            },
            instructions: {
                type: Array,
                required: true
            },
        }
    };
</script>


<style scoped>

</style>