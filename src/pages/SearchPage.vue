<template>
  <div class="container">
    <h1 class="title">Search Page</h1>

    <div class="search-container">
      <div class="search-input">
        <b-form-input v-model="searchQuery" placeholder="Enter recipe name" col="2"></b-form-input>
        
        <b-button @click="updateRecipes()">Search</b-button>
      </div>
      <div class="select-inputs">
        <b-form-select v-model="cusineSelected" :options="cusineOptions"></b-form-select>
        <b-form-select v-model="dietSelected" :options="dietOptions"></b-form-select>
        <b-form-select v-model="intoleranceSelected" :options="intoleranceOptions"></b-form-select>
        <b-form-select v-model="numberSelected" :options="numberOptions"></b-form-select> 
        <b-form-select v-model="filterSelected" :options="filterOptions" @change="sortRecipes()"></b-form-select>
        
      </div>
      <p> Last search: {{ lastSearch }}</p>

    </div>

    <b-container>
    <h3>
      Results:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
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
import RecipePreview from "../components/RecipePreview";
import cuisine from "../assets/cuisine";
import diet from "../assets/diet";
import intolerance from "../assets/intolerance";

export default{
components: {
    RecipePreview
  },

data(){
  return {
    searchQuery:'', 
    recipes: [],
    showNoRecipesAlert:false,
    lastSearch:'',

    cusineSelected: null,
    cusineOptions: [
      { value: null, text: 'Cuisine', disabled: true },
    ],


    dietSelected: null,
    dietOptions: [
      { value: null, text: 'Diet', disabled: true },
    ],

    intoleranceSelected: null,
    intoleranceOptions: [
      { value: null, text: 'Intolerance', disabled: true },
    ],

    numberSelected: null,
    numberOptions: [
      { value: null, text: 'Results count' },
      { value: '5', text: '5' },
      { value: '10', text: '10' },
      { value: '15', text: '15' },
    ],

    filterSelected: null,
    filterOptions: [
      { value: null, text: 'Filter by' },
      { value: 'a', text: 'Preperation time' },
      { value: 'b', text: 'Popularity' },
    ]
      
  }
},
mounted(){
  if (localStorage.getItem(`lastSearch`)) {
      this.lastSearch = localStorage.getItem(`lastSearch`);   
    }

  this.showNoRecipesAlert=false
  this.cusineOptions.push(...cuisine);
  this.dietOptions.push(...diet);
  this.intoleranceOptions.push(...intolerance);
}, 

methods: {
    async updateRecipes() {
      this.lastSearch = this.searchQuery;
      localStorage.setItem(`lastSearch`,  this.lastSearch);
      this.showNoRecipesAlert=false
      try {

        console.log(this.searchQuery)
        console.log(this.cusineSelected)
        console.log(this.intoleranceSelected)
        console.log(this.dietSelected)
        const response = await this.axios.get(
        this.$root.store.server_domain + '/recipes/complexSearch',
          {
            params: {
              query: this.searchQuery,
              cuisine: this.cusineSelected,
              intolerance: this.intoleranceSelected,
              diet: this.dietSelected,
              number: this.numberSelected
            },
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
  
  sortRecipes() {
      // Sort the recipes based on the selected filter
      switch (this.filterSelected) {
        case 'a':
        console.log(this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes));
        return this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
          
        case 'b':
          return this.recipes.sort((a, b) => b.popularity - a.popularity);
        default:
          return this.recipes;
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
