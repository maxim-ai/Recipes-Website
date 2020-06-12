<template>
  <div class="recipe-preview">
    <div class="recipe-body">
      <div
        :style="{ 'background-image': `url(${image})` }"
        data-bindattr-421="421"
        class="recipe-image"
      ></div>
    </div>
    <div class="recipe-footer">
      <div :title="title" class="recipe-title">
        {{ title }}
      </div>
      <ul class="recipe-overview">
        <img src="../assets/clock_icon.png" width="20" height="20" />
        <li>{{ readyInMinutes }} minutes</li>
        <img src="../assets/like_icon.png" width="20" height="20" />
        <li>{{ aggregateLikes }} likes</li>
      </ul>
      <ul class="recipe-overview">
        <li id="if" v-if="vegetarian" style="color:green;">vegetarian</li>
        <li id="else" v-else style="color:red;">not vegetarian</li>
        <li id="if" v-if="vegan" style="color:green;">vegan</li>
        <li id="else" v-else style="color:red;">not vegan</li>
        <li id="if" v-if="glutenFree" style="color:green;">glutenFree</li>
        <li id="else" v-else style="color:red;">not glutenFree</li>
      </ul>
      <br />
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
    watched: {
      type: Boolean,
      required: false,
      default() {
        return undefined;
      }
    },
    inFavorites: {
      type: Boolean,
      required: false,
      default() {
        return undefined;
      }
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  /* display: inline-block; */
  width: 500px;
  border: 1px solid #ccbba5;
  position: relative;
  margin: 3px 3px 0px 50px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  transition: transform 0.2s;
}
.recipe-preview:hover {
  transform: scale(1.2);
  z-index: 10;
}

.recipe-preview .recipe-body {
  z-index: -1;
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-footer {
  /* width: 100%;
  overflow: hidden; */
  position: absolute;
  bottom: 0px;
  /* right: 20px; */
  background: rgba(0, 0, 0, 0.8);
  color: white;
  /* padding-left: 20px; */
  /* padding-right: 20px; */
}

.recipe-preview .recipe-body .recipe-image {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 70%;
  height: 40%;
  overflow: hidden;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 5px 5px;
  font-weight: bold;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  /* min-height: 45px; */
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 2px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
  margin-top: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
