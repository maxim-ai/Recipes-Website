<template>
  <div class="recipe-preview">
    <div class="recipe-image">
      <img :src="image" width="500" height="500">
    </div>
    <div class="recipe-body">
      <ul class="recipe-overview">
        <li>title: {{ title }}</li>
        <li>making time: {{ readyInMinutes }} minutes</li>
        <li>likes: {{ aggregateLikes }} likes</li>
        <li>vegetarian: {{ vegetarian }}</li>
        <li>vegan: {{ vegan }}</li>
        <li>glutenFree: {{ glutenFree }}</li>
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
    readyInMinutes: {
      type: Number,
      required: true
    },
    aggregateLikes: {
      type: Number,
      required: false,
      default() {
        return undefined;
      }
    },
    vegetarian: {
      type: Boolean,
      required: true
    },
    vegan: {
      type: Boolean,
      required: true
    },
    glutenFree: {
      type: Boolean,
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
    numOfDiners: {
      type: Number,
      required: true
    }
  }
};
</script>

<style></style>
