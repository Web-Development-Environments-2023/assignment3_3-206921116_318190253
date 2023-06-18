<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item router-link :to="{ name: 'main' }">Vue Recipes</b-nav-item>
        <b-nav-item router-link :to="{ name: 'search' }">Search</b-nav-item>

        <template v-if="!$root.store.username">
          <b-nav-item router-link :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item router-link :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-text><span class="nav-text">Hello Guest</span></b-nav-text>
        </template>

        <template v-else>
          <b-nav-item @click="showModal">Create Recipe</b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{$root.store.username}}</em>
            </template>
            <b-dropdown-item router-link :to="{ name: 'MyRecipes' }">My recipes</b-dropdown-item>
            <b-dropdown-item router-link :to="{ name: 'favorites' }">My favorite recipes</b-dropdown-item>
            <b-dropdown-item router-link :to="{ name: 'FamilyRecipes' }">My family recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button variant="outline-secondary" @click="logout">Logout</b-button>
        </template>
      </b-navbar-nav>
    </b-navbar>

    <router-view />

    <b-modal v-if="isModalVisible" @hidden="resetRecipe" title="Add Recipe">
      <form @submit.prevent="saveRecipe">
        <label for="recipeName">Name:</label>
        <input type="text" id="recipeName" v-model="recipe.name" required>

        <label for="image">Image:</label>
        <input type="url" id="image" v-model="recipe.image" required>

        <label for="duration">duration (minutes):</label>
        <input type="number" id="duration" v-model="recipe.duration" required>

        <div>
          <input type="checkbox" id="vegan" v-model="recipe.vegan">
          <label for="vegan">Vegan</label>
        </div>

        <div>
          <input type="checkbox" id="vegetarian" v-model="recipe.vegetarian">
          <label for="vegetarian">Vegetarian</label>
        </div>

        <div>
          <input type="checkbox" id="glutenFree" v-model="recipe.glutenFree">
          <label for="glutenFree">glutenFree</label>
        </div>

        <label for="instructions">instructions:</label>
        <input type="text" id="instructions" v-model="recipe.instructions" required>
        <br>
        <label for="ingredients">Ingredients:</label>
          <div>
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
              <input type="text" v-model="ingredient.name" placeholder="Name" required>
              <input type="text" v-model="ingredient.unit" placeholder="Unit" required>
              <input type="number" v-model="ingredient.amount" placeholder="Amount" required>
              <button @click="removeIngredient(index)">Remove</button>
            </div>
            <button @click="addIngredient">Add Ingredient</button>
          </div>

        <label for="servings">servings:</label>
        <input type="number" id="servings" v-model="recipe.servings" required>

        <b-button type="submit" variant="primary">Save</b-button>
        <b-button variant="secondary" @click="hideModal">Cancel</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalVisible: false,
      recipe: {
        name: '',
        image: '', // Use "image" instead of "imageUrl"
        prepTime: null,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        likes: 0,
        instructions: '',
        servings: 0,
        ingredients: []
      }
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.resetRecipe();
      this.isModalVisible = false;
    },
    async saveRecipe() {
      // Perform save logic here
      try {
    const { name, image, duration, vegan, vegetarian, glutenFree, instructions,ingredients, servings} = this.recipe;

    const response = await this.axios.post(
      this.$root.store.server_domain + "/users/addUserRecipe",
      {
        name:name,
        image:image,
        duration:duration,
        likes:0,
        vegan:vegan ? 1 : 0,
        vegetarian:vegetarian ? 1 : 0,
        glutenFree:glutenFree ? 1 : 0,
        instructions:instructions, 
        servings:servings,
        ingredients:ingredients
      }, { withCredentials: true }
    );

    // Handle the response from the server
    // For example, redirect to a success page or show a success message

    this.hideModal();
  } catch (error) {
    console.log(this.recipe)
        console.log(error.response);
        this.form.submitError = err.response.data.message;
      }
      this.hideModal();
    },
    resetRecipe() {
      this.recipe = {
        name: '',
        image: '',
        duration: null,
        likes: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: '',
        servings: null,
        ingredients: []
      };
    },

    addIngredient() {
    this.recipe.ingredients.push({
      name: '',
      unit: '',
      amount: null
    });
    console.log(this.recipe.ingredients)
  },

  removeIngredient(index) {
    this.recipe.ingredients.splice(index, 1);
  },
    logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        location.reload();
      });
    }
      
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

.nav-text {
  font-size: medium;
  margin: 5px;
  color: black;
}
</style>
