<template>
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1>{{ recipe.title }}</h1>
          <img :src="recipe.image" class="center" />
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
                <div>Likes: {{ recipe.aggregateLikes }} likes</div>
                <div>Servings: {{ recipe.servings }}</div>
                <div>Created by: {{ recipe.creator }}</div>
                <div>Usually prepared: {{ recipe.season }}</div>
              </div>
              Ingredients:
              <ul>
                <li
                  v-for="(r, index) in recipe.extendedIngredients"
                  :key="index + '_' + r.name"
                >
                  {{ r.amount }} {{ r.unit }} {{ r.name }} 
                </li>
              </ul>
            </div>
            <div class="wrapped">
              Instructions:
              <ol>
                <li v-for="s in recipe._instructions" :key="s">
                  {{ s }}
                </li>
              </ol>
            </div>
          </div>
        </div>
        <!-- <pre>
        {{ $route.params }}
        {{ recipe }}
      </pre
        > -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipe: null
      };
    },
    async created() {
      try {
        let response;
        // response = this.$route.params.response;
        try {
          response = await this.axios.get(
            // "https://test-for-3-2.herokuapp.com/recipes/info",
            this.$root.store.server_domain + `/recipes/familyfull/${this.$route.params.recipeId}`,
            {
              // params: { id: this.$route.params.recipeId },
              withCredentials: true
            }
          );
            //console.log(response.headers)
          // console.log("response.status", response.status);
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
        // let {
        //   analyzedInstructions,
        //   instructions,
        //   extendedIngredients,
        //   aggregateLikes,
        //   readyInMinutes,
        //   image,
        //   title,
        //   servings
        // } = response.data;
        // console.log(analyzedInstructions)
        let _instructions = response.data.instructions;
        let extendedIngredients = response.data.extendedIngredients;
        let aggregateLikes = response.data.aggregateLikes;
        let readyInMinutes = response.data.readyInMinutes;
        let image = response.data.image;
        let title = response.data.title;
        let servings = response.data.servings;
        let creator = response.data.creator;
        let season = response.data.season;
  
        // let _instructions = analyzedInstructions
        //   .map((fstep) => {
        //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
        //     return fstep.steps;
        //   })
        //   .reduce((a, b) => [...a, ...b], []);
  
        let _recipe = {
          //instructions,
          _instructions,
          //analyzedInstructions,
          extendedIngredients,
          aggregateLikes,
          readyInMinutes,
          image,
          title,
          servings,
          creator,
          season
        };
  
        this.recipe = _recipe;
      } catch (error) {
        console.log(error);
      }
    }
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  /* .recipe-header{
  
  } */
  </style>
  