<template>
  <div>
    <b-container fluid class="font">
      <h1 class="title">Main Page</h1>

      <b-row class="justify-content-center">
        <b-col md="6">
          <b-col offset-md="4"> 
            <b-button variant="outline-secondary" @click="reload()">
              Shuffle me some recipes
            </b-button>
          </b-col>
          <RecipePreviewList
            ref="recipePreviewList"
            title="Random Recipes"
            class="RandomRecipes center"
          />
        </b-col>

        <b-col md="6">
          <b-col offset-md="4"> 
            <b-button
              variant="outline-secondary"
              v-if="!$root.store.username"
              router-link
              :to="{ name: 'login' }"
            >
              You need to Login to view this
            </b-button>
          </b-col>
          <RecipePreviewList
            title="Last Viewed Recipes"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true
            }"
            disabled
          ></RecipePreviewList>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList
  },
  methods: {
    reload() {
      this.$refs.recipePreviewList.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.font {
  font-family: Helvetica;
}

.title {
  text-align: center;
}

.RandomRecipes {
  padding: 5%;
}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

</style>
