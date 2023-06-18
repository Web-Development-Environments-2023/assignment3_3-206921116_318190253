<template>

<div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="First Slide"
      img-src="https://picsum.photos/1024/480/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
  </b-carousel>
</div>
  <BContainer fluid class="font">
    <h1 class="title">Main Page</h1>

    <BRow>

      <BCol md="6">
        <RecipePreviewList ref="recipePreviewList" title="Random Recipes" class="RandomRecipes center" />
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

    <BContainer class="fixed-button-container">
        <b-button variant="outline-secondary" class="fixed-button" @click="reload()">Shuffle me some recipes</b-button>
    </BContainer>

  </BContainer>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },

  methods:{
    reload(){
      
      this.$refs.recipePreviewList.reload();
    }
  }
};
</script>

<style lang="scss" scoped>

.font{
  font-family: Helvetica;
}
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

.fixed-button-container {
  position: fixed;
  bottom: 170px;
  right: 420px;
}
</style>
