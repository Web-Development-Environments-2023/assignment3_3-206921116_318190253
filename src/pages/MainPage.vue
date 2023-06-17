<template>
  <BContainer fluid>
    <BRow>
      
      <BCol md="6">
        <h1 class="bd-content-title">Main Page</h1>
        <RecipePreviewList ref="recipePreviewList" :key="recipesReload" title="Random Recipes" class="RandomRecipes center" />
        <b-button variant="outline-secondary" @click="reload()">Shuffle me some recipes</b-button>
      </BCol>

      <BCol md="6">
        <b-button  variant="outline-secondary" v-if="!$root.store.username" router-link :to="{ name: 'login' }" >You need to Login to vue this</b-button>
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true
          }"
          disabled
        ></RecipePreviewList>
      </BCol>

    </BRow>
  </BContainer>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data(){
    return{
      recipesReload:0,
    };
  },

  methods:{
    reload(){
      this.recipesReload++;
      this.$refs.recipePreviewList.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.title{
  text-align: center;
}
.RandomRecipes {
  padding: 5%;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
