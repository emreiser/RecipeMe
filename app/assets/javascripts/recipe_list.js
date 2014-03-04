// Send AJAX request from basket click handler - returns matching recipes
//Create function
//to create HTML for displaying recipes (2 functions, displayALL & displayOne)

var RecipeMe = RecipeMe || {};

RecipeMe.button_check = function(ingredients){
  if(ingredients.length !== 0){
    $("#find-recipe").removeClass('disabled');
  }
};

// parses out the ingredients
RecipeMe.look_up_basket = function(basket_id){
  $.ajax({
    url: '/baskets/' + basket_id,
    type: 'PUT',
    dataType: 'json',
    data: { basket: {id: basket_id }}
  })
  .done(function(data) {
    console.log(data);
    RecipeMe.list_ingredients_of_basket(data);
  })
  .fail(function(data) {
    console.log("error");
  })
};

//parse out list of ingredients
RecipeMe.list_ingredients_of_basket = function(data){
  var i = 0, ingredient_list = "";
  for(; i < data.length; i++) {
      var ingredient = data[i];
      ingredient_list += ingredient.name + "+";
    }
  RecipeMe.requestRecipes(ingredient_list);
};

//Runs set_up_div_container and make API call for the recipies
RecipeMe.requestRecipes = function(ingredent_list_from_basket) {
  $.ajax({
    url: '/yummly',
    type: 'GET',
    dataType: 'json',
    data: {ingredients: ingredent_list_from_basket }
  })
  .done(function(data) {
    RecipeMe.renderAllRecipes(data.matches);
    console.log("got recipes")
    //RecipeMe.sort_recipe_score(data,ingredent_list_from_basket);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
};

// sorts the recipies and store them in an array
// RecipeMe.sort_recipe_score = function(data, ingredients_from_basket) {
// };

// iterates and runs over the array to render
RecipeMe.renderAllRecipes = function(recipes) {
  $('#content').text(""),
    $container_div = $('<div class="container">');
  $('#content').append($container_div);
  var l = recipes.length, i = 0;
  for(; i < l; i++) {
    this.renderRecipe(recipes[i], $container_div);
  }
};

// renders the div for display on the index page
RecipeMe.renderRecipe = function(recipe, container) {
  var $recipe_div = $('<div class="col-md-4 recipe thumbnail">'),
    $recipe_content = $('<div class="recipe-content dark-boxy" id="recipe' + recipe.id + '">'),
    $recipe_title = $("<h3>" + recipe.recipeName + "</h3>"),
    $recipe_img = $('<img class="recipe-img" src=' + recipe.smallImageUrls[0] + '>');

  $recipe_content.append($recipe_title);
  $recipe_div.append($recipe_img, $recipe_content);
  container.append($recipe_div);
};







