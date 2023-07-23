<template>
    <b-card 
      img-alt="Image"
      img-top
      no-body
      style="max-width: 20rem;">

    <b-card-img @click="clicked" style="cursor: pointer;" :src="recipe.image" alt="Image" bottom></b-card-img>

      <b-card-body>
        <div class="d-flex align-items-start mb-2" @click="toggleBookmark">
          <b-icon :icon="bookmarkIcon"></b-icon>
          <b-card-title class="ml-2" style="font-size: 20px"><strong>{{ recipe.title }}</strong></b-card-title>
        </div>
        
        <b-card-text>
          {{ recipe.readyInMinutes }} minutes <br>
          {{ recipe.popularity }} likes <br>

          <b-avatar v-if = recipe.vegan variant="success" size="3.5em" style="font-size: 14px; margin: 2px;">Vegan</b-avatar>
          <b-avatar v-if = recipe.vegetarian variant="success" size="3.5em" style="font-size: 14px; margin: 2px;"> Veggie</b-avatar>
          <b-avatar v-if = recipe.glutenFree variant="success" size="3.5em" style="font-size: 14px; margin: 2px;">Gluten<br>Free</b-avatar>
          <b-avatar v-if = !recipe.glutenFree variant="danger" size="3.5em" style="font-size: 14px; margin: 2px;">Gluten</b-avatar>

        </b-card-text> 
      </b-card-body>

      <b-card-footer v-if="watched">
        <small class="text-muted">👁 Viewed</small>
      </b-card-footer>

  </b-card>
</template>

<script>

export default {
mounted() {
if (localStorage.getItem(`watched_${this.recipe.id}`)) {
  this.watched = true;    
}

if (localStorage.getItem(`saved_${this.recipe.id}`)) {
  this.bookmarkIcon = "bookmark-fill";    
}

this.axios.get(this.recipe.image).then((i) => {
  this.image_load = true;
});
},
data() {
return {
  image_load: false,
  watched:false,
  saved:false,
  bookmarkIcon: "bookmark"
};
},
methods: 
{
async clicked() {
  localStorage.setItem(`watched_${this.recipe.id}`, 'true');
  this.$router.push({ name: 'MyRecipeFull', params: { recipeId: this.recipe.id } });

  try {
    await this.axios.post(
    this.$root.store.server_domain + "/users/viewed",
    {
      recipe_id:this.recipe.id
    }, { withCredentials: true }
  );
  }
  catch(error){
    this.form.submitError = err.response.data.message;
  }
},

async toggleBookmark() {
  localStorage.setItem(`saved_${this.recipe.id}`, 'true');
  if (this.bookmarkIcon === "bookmark") {
    this.bookmarkIcon = "bookmark-fill";
  }
  try {
    await this.axios.post(
    this.$root.store.server_domain + "/users/favorites",
    {
      recipeId:this.recipe.id
    }, { withCredentials: true }
  );
  }
  catch(error){
    this.form.submitError = err.response.data.message;
  }
},

},

props: {
recipe: {
  type: Object,
  required: true
}
}
};

</script>

<style scoped>
/* 
.recipe-preview {
display: inline-block;
width: 90%;
height: 100%;
position: relative;
margin: 10px 10px;

}

.b-card {
flex: 1 1 300px;  
} 

.recipe-preview > .recipe-body {
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
}  */
</style>
