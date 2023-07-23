import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/users/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/users/getmyrecipes",
    name: "MyRecipes",
    component: () => import("./pages/MyRecipes"),
  },
  {
    path: "/users/familyrecipes", //what do i write here??
    name: "FamilyRecipes",
    component: () => import("./pages/FamilyRecipesPage")
  },
  {
    path: "/users/about", //what do i write here??
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "recipe/myfull/:recipeId",
    name: "MyRecipeFull",
    component: () => import("./pages/MyRecipeViewPage")
  },
  {
    path: "recipe/myfull/:recipeId",
    name: "MyFamilyRecipeFull",
    component: () => import("./pages/FamilyRecipeViewPage")
  }
  
];

export default routes;
