<template>
  <!-- <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"  > -->
    <!-- <div  class="text-center my-3"> -->
      <div class ="card-container">
        <b-card 
          :title="recipe.title"
          :img-src="recipe.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          height="100px"
          @click="clicked"
        >
          <b-card-text>
            {{ recipe.readyInMinutes }} minutes <br>
            {{ recipe.aggregateLikes }} likes <br>
              
            <b-avatar v-if = recipe.vegan variant="success" size="3.5em" style="font-size: 14px;">Vegan</b-avatar>
            <b-avatar v-else-if = recipe.vegetarian variant="success" size="3.5em" style="font-size: 14px;"> Veggie</b-avatar>
            <b-avatar v-else-if = recipe.glutenFree variant="success" size="3.5em" style="font-size: 14px;">Gluten<br>Free</b-avatar>
            <b-avatar v-else-if = !recipe.glutenFree variant="danger" size="3.5em" style="font-size: 14px;">Gluten</b-avatar>

            <div class="d-flex justify-content-end">
              <small v-if="watched" class="text-muted">👁 Watched</small>
            </div>   
          </b-card-text> 
        </b-card>
    </div>

  <!-- </router-link> -->
</template>

<script>

export default {
    mounted() {
    if (localStorage.getItem(`watched_${this.recipe.id}`)) {
      this.watched = true;    
    }
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
      watched:false
    };
  },
  methods: 
  {
  clicked() {
    localStorage.setItem(`watched_${this.recipe.id}`, 'true');
    this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id } });
    }
  },

  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};

</script>

<style scoped>

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: pointer;
}

.card-container b-card {
  flex-basis: calc(33.33% - 1rem);
  margin-bottom: 1rem;
}




/* .recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;

}

.b-card {
  flex: 1 1 300px; /* Adjust the width of each card as needed 
} */

/* .recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
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
} */
</style>
