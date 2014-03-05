// look up a recipe from the data base
//Create function to diplay them
//to create HTML for displaying recipes (2 functions, displayALL & displayOne)

var RecipeMe = RecipeMe || {};

// gets the recipe from the database
RecipeMe.look_up_recipe = function(recipe_id){
  $.ajax({
    url: '/recipes/' + recipe_id,
    type: 'PUT',
    dataType: 'json',
    data: { basket: {id: recipe_id }}
  })
  .done(function(data) {
    console.log("got the recipe");
    RecipeMe.renderRecipeShow(data);
  })
  .fail(function(data) {
    console.log("error");
  })
};

// renders the div for display on the index page
RecipeMe.render_recipe_show_info = function(recipe) {
  var $content = $('#content'),
      $container = $('<div class="container">'),
      $container_header = $('<div class="page-header">'),
      $recipe_title = $('<h1 class="recipe-title">' +  recipe.title + '</h1>'),
      $recipe_img = $('<img class="recipe-show-img" src=' + recipe.imageurl + '>'),
      $recipe_ingredient_list = RecipeMe.list_ingredients_for_recipe(recipe.ingeredientlist),
      $recipe_show_content = $('<div class="col-sm-8 recipe-show" id="recipe_' + recipe.id + '">'),
      $recipe_ingredient_list,
      $recipe_side_bar;

  $content.text("");
  $recipe_side_bar = RecipeMe.render_side_bar(recipe);
  //$recipe_ingredient_list = RecipeMe.list_ingredients_for_recipe(recipe.ingredients);

  $container_header.append($recipe_img, $recipe_title);
  $recipe_show_content.append($container_header);
  $recipe_show_content.append($recipe_ingredient_list);
  $container.append($recipe_show_content, $recipe_side_bar);
  $content.append($container);

};

// renderd the lsit of recipes
RecipeMe.list_ingredients_for_recipe = function(ingredients){
  var ingredients = ingredients.split(':'),
    i = 0,
    $recipe_ingredient_list = $('<ul class="recipe_ingredients">');
  for(; i < ingredients.length; i++) {
      var $list_element, ingredient = ingredients[i];
      $list_element = $('<li>' + ingredients[i] + '</li>');
      $recipe_ingredient_list.append( $list_element);
    }
  return $recipe_ingredient_list;
};


RecipeMe.render_side_bar = function(recipe){
  var $fav_button,
      $recipe_external_url = $('<button class="btn btn-lg-primary" id="recipe_url_' + recipe.id + '">' + 'http://www.yummly.com/recipe/external/' + recipe.ymmlyid + '</button>'),
      $side_bar_div = $('<div class="col-sm-3 recipe-side-bar" id="recipe_side_bar' + recipe.id + '">');

    $side_bar_div.append($recipe_external_url, $fav_button);
  return $side_bar_div;
}







