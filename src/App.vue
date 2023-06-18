<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item router-link :to="{ name: 'main' }">Vue Recipes</b-nav-item>
        <b-nav-item router-link :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item router-link :to="{ name: 'about' }">About</b-nav-item>


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
    <div>
      <b-modal v-model="isModalVisible" id="modal-1" title="Add Recipe" hide-footer size="xl">
        <form class="modal-form" @submit.prevent="saveRecipe">
          <label for="recipeName">Name:</label>
          <input type="text" id="recipeName" v-model="recipe.name" required>
          <label for="image">Image:</label>
          <input type="url" id="image" v-model="recipe.image" required>
          <label for="duration">Duration (minutes):</label>
          <input type="number" id="duration" v-model="recipe.duration" required>
          <div class="checkbox-group">
  <br>
  <br>
  <label for="vegan">Vegan</label>
  <input type="checkbox" id="vegan" v-model="recipe.vegan">

  <label for="vegetarian">Vegetarian</label>
  <input type="checkbox" id="vegetarian" v-model="recipe.vegetarian">

  <label for="glutenFree">Gluten Free</label>
  <input type="checkbox" id="glutenFree" v-model="recipe.glutenFree">
</div>

          <label for="instructions">Instructions:</label>
          <input type="text" id="instructions" v-model="recipe.instructions" required>
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

          <label for="servings">Servings:</label>
          <input type="number" id="servings" v-model="recipe.servings" required>

          <b-button type="submit" variant="primary">Save</b-button>
          <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalVisible: false,
      recipe: {
        name: '',
        image: '',
        duration: null,
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
      try {
        const { name, image, duration, vegan, vegetarian, glutenFree, instructions, ingredients, servings } = this.recipe;

        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/addUserRecipe",
          {
            name: name,
            image: image,
            duration: duration,
            likes: 0,
            vegan: vegan ? 1 : 0,
            vegetarian: vegetarian ? 1 : 0,
            glutenFree: glutenFree ? 1 : 0,
            instructions: instructions,
            servings: servings,
            ingredients: ingredients
          },
          { withCredentials: true }
        );

        // Handle the response from the server
        // For example, redirect to a success page or show a success message

        this.hideModal();
      } catch (error) {
        console.log(this.recipe);
        console.log(error.response);
        this.form.submitError = error.response.data.message;
      }
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

.b-modal.modal {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 1;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 1;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Ensure the modal appears on top */
}


.modal-form {
  background-color: white; /* Set the background color of the form */
  border: 2px solid white; /* Bright orange border */
  padding: 20px; /* Add padding to create space between the border and form content */
  width: 90%; /* Adjust the width as needed */
  margin: 0 auto;
  /* Other styles */
}

.modal-backdrop .modal-form input[type="text"],
.modal-backdrop .modal-form input[type="url"],
.modal-backdrop .modal-form input[type="number"] {
  width: 100%; /* Set the width of the input fields to 100% */
}

.modal-backdrop .modal-form label {
  font-weight: bold; /* Make the labels bold for better visibility */
}

.modal-backdrop .modal-form button[type="submit"],
.modal-backdrop .modal-form button[type="button"] {
  margin-top: 10px; /* Add some spacing between buttons */
}
// .checkbox-group {
//   display: grid;
//   align-items: center;
//   gap: 10px;
// }

// .checkbox-group label {
//   margin: 0;
// }
.modal-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-form label {
  text-align: center;
}

.modal-form input[type="text"],
.modal-form input[type="url"],
.modal-form input[type="number"] {
  text-align: center;
  width: 80%;
}

.modal-form button[type="submit"],
.modal-form button[type="button"] {
  margin-top: 10px;
  align-self: center;
}

.modal-content {
  background-color: #4134b9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  max-width: 90%; /* Decrease the maximum width */
  width: 90%;
  max-height: 100vh;
  overflow-y: auto; /* Add vertical scroll if needed */
}
.modal-dialog {
  max-width: 90%; /* Decrease the maximum width */
  margin: 30px auto; /* Adjust the margin to center the modal */
}
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-group label {
  flex-basis: 30%; /* Adjust the width of the label as needed */
}
</style>
