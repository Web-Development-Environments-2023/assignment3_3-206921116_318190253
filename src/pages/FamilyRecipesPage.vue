<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>
    <b-container>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <MyFamilyPreview class="MyFamilyPreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
  <b-alert
      class="mt-2"
      v-if="showNoRecipesAlert"
      variant="warning"
      dismissible
      show>
      No recipes found
    </b-alert>
  </div>
</template>

<script>
import MyFamilyPreview from "../components/MyFamilyPreview";
export default{
components: {
  MyFamilyPreview
  },
data(){
  return {
    recipes: [],
    showNoRecipesAlert:false,
  
  }
},
mounted() {
  // Run updateRecipes when the component is created
  this.updateRecipes();
},
methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
        this.$root.store.server_domain + '/users/getfamilyrecipes',
          {
            withCredentials: true
          }
        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);

        if (recipes.length ===0 )
          this.showNoRecipesAlert = true;

      } 
      catch (error) {
        console.log(error);
      }
    },
  

  },

}
</script>

<style>
.search-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center; /* Center vertically */
}

.search-input {
  display: flex;
  gap: 10px;
  width: 250px;

}

.select-inputs {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 750px;
}
</style>
