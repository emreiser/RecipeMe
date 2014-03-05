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
  .fail(function(data) {
    console.log("error");
    console.log(data);
  })
  .always(function() {
    console.log("complete");
  });
};

// iterates and runs over the array to render
RecipeMe.renderAllRecipes = function(recipes) {
  $('#content').text("");
  var $container_div = $('<div class="container">'),
    l = recipes.length, favorite_array;

  favorite_array = RecipeMe.get_favorites();

  $('#content').append($container_div);

  if (l === 0) {
    $container_div.append('<h1>Sorry, your search did not return any recipes</h1>');
    $basket_button = $('<button class="btn btn-lg btn-warning">Modify your search</button>');
    $container_div.append($basket_button);
    $basket_button.click(function(event) {
      event.preventDefault();
      RecipeMe.getIngredients();
      return false;
    })
  } else {
    var l = recipes.length, i = 0;
    for(; i < l; i++) {
      this.renderRecipe(recipes[i], $container_div, favorite_array);
    }
  }
};

// renders the div for display on the index page
RecipeMe.renderRecipe = function(recipe, container, favorite_array) {

  var recipe = recipe,
    $recipe_div = $('<div class="col-sm-4 recipe thumbnail">'),
    $recipe_content = $('<div class="recipe-content dark-boxy" id="recipe' + recipe.id + '">'),
    $recipe_content_inner_title = $('<div class="col-sm-10">'),
    $recipe_content_inner_favorite = $('<div class="col-sm-2">'),
    $recipe_title = $("<h3>" + recipe.recipeName + "</h3>"),
    $recipe_img = $('<img class="recipe-img" src=' + recipe.smallImageUrls[0] + '>'),
    $recipe_favor = $('<span class="glyphicon glyphicon-star"></span>');

  RecipeMe.addRecipe(recipe);

  if ($.inArray(recipe.id, favorite_array)){
    $recipe_favor.addClass('favorite');
  };

  $recipe_content_inner_title.append($recipe_title);
  $recipe_content_inner_favorite.append($recipe_favor);
  $recipe_content.append($recipe_content_inner_title, $recipe_content_inner_favorite);
  $recipe_div.append($recipe_img, $recipe_content);
  container.append($recipe_div);

};







