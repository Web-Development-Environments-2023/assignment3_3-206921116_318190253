<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <div class="recipeGrid">
        <RecipePreview v-for="r in recipes" :key="r.id" :recipe="r" class="recipePreview" />
      </div>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      shuffle: false
    };
  },

  mounted() 
  {
    this.updateRecipes();    
  },

  methods: {
    async updateRecipes() {
      try {
        let endpoin= '';

        if (this.title==="Random Recipes")
          {endpoin = "/recipes/random";}
        else if (this.title==="Last Viewed Recipes")  
          endpoin='/users/viewed'

        const storedRecipes = localStorage.getItem('savedRecipes');
        if(storedRecipes && endpoin === "/recipes/random" && this.shuffle===false)
        {
          this.recipes = JSON.parse(storedRecipes);
        }
        else
        {
          const response = await this.axios.get(
          this.$root.store.server_domain + endpoin,
          {withCredentials: true}
          );

          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
          
          console.log(this.recipes)
          if (endpoin === "/recipes/random")
          {localStorage.setItem('savedRecipes', JSON.stringify(recipes));
          this.shuffle===false;}
        }
      


      } catch (error) {
        console.log(error);
      }
    },

    reload(){
      this.shuffle=true;
      this.updateRecipes();  
    }

    
  }
};
</script>

<style lang="scss" scoped>
.recipeGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.recipePreview {
  flex-basis: calc(33.33% - 20px);
  margin: 10px;
}
</style>
