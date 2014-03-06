// Send AJAX request from basket click handler - returns matching recipes
//Create function
//to create HTML for displaying recipes (2 functions, displayALL & displayOne)

var RecipeMe = RecipeMe || {};

RecipeMe.button_check = function(ingredients){
  if(ingredients.length !== 0){
    $("#find-recipe").removeClass('disabled');
  } else {
    $("#find-recipe").addClass('disabled');
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
  });
};

RecipeMe.clear_basket = function(basket_id) {
  $.ajax({
    url: '/baskets/' + basket_id +'/edit',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    RecipeMe.renderIngredients([], basket_id);
    RecipeMe.button_check([]);
  });
}

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
    console.log(data);
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
                   l = recipes.length,
       $header_title = $('<h1 class="recipe-index-header">Recipe Results</h1>'),
         $header_div = $('<div class="page-header">'),
         $back_to_basket = $('<a href="" id="back_to_basket">Modify search</a>'),
         favorite_array;

  $back_to_basket.click(function(event) {
    event.preventDefault();
    RecipeMe.getIngredients();
    return false;
  });

  $header_div.append($header_title, $back_to_basket);
  $container_div.append($header_div);
  $container_div.append(RecipeMe.renderAttribution());
  $('#content').append($container_div);

  RecipeMe.get_favorites(function(data) {
    console.log("success");
    var j = 0 , k = data.length,
        favorite_array = [];
    for (; j < k; j++){
       favorite_array.push(data[j].yummlyid);
    }
    //debugger;

    if (recipes.length === 0) {
      $container_div.text("");
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
        RecipeMe.renderRecipe(recipes[i], $container_div, favorite_array);
      }
    };
  });


};

// renders the div for display on the index page
RecipeMe.renderRecipe = function(recipe, container, favorite_array) {

  var recipe = recipe,
    recipe_image = recipe.smallImageUrls[0] || '/recipeme.png',
    $recipe_div = $('<div class="col-sm-4 recipe thumbnail">'),
    $recipe_content = $('<div class="recipe-content dark-boxy" id="recipe' + recipe.id + '">'),
    $recipe_content_inner_title = $('<div class="col-sm-10">'),
    $recipe_content_inner_favorite = $('<div class="col-sm-2">'),
    $recipe_title = $("<a class='recipe_title'>" + recipe.recipeName + "</h3>"),
    $recipe_img = $('<img class="recipe-img" src="' + recipe_image + '">'),
    $recipe_favor = $('<span class="glyphicon glyphicon-star"></span>');

  // Add recipe to database
  RecipeMe.addRecipe(recipe, function(data) {
    if ($.inArray(recipe.id, favorite_array) !== -1){
      $recipe_favor.addClass('favorite');
    }

    $recipe_favor.click(function(event) {
      event.preventDefault();
      $(this).toggleClass('favorite');
      RecipeMe.add_favorite(recipe);
      return false;
    });

    $recipe_content_inner_title.append($recipe_title);
    $recipe_content_inner_favorite.append($recipe_favor);
    $recipe_content.append($recipe_content_inner_title, $recipe_content_inner_favorite);
    $recipe_div.append($recipe_img, $recipe_content);

    container.append($recipe_div);

    $recipe_title.click(function(event) {
      event.preventDefault();
      RecipeMe.look_up_recipe(data.id);
      return false;
    });
  });
};

RecipeMe.renderAttribution = function() {
  var $yummly_attribution = $('<div id="yummly-att" class="footer">'),
      $yummly_attribution_content = $('<small id="yummly-att-content"> Recipe search powered by <a href="http://www.yummly.com/recipes"><img alt="Yummly" src="http://static.yummly.com/api-logo.png"/></a></small>'),
      $container = $('.container');

  $yummly_attribution.append($yummly_attribution_content);
  return $yummly_attribution;
};




