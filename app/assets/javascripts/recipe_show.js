// look up a recipe from the data base
//Create function to diplay them
//to create HTML for displaying recipes (2 functions, displayALL & displayOne)

var RecipeMe = RecipeMe || {};

// gets the recipe from the database
RecipeMe.look_up_recipe = function(recipe_id){
  $.ajax({
    url: '/recipes/' + recipe_id,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    console.log("got the recipe");
    RecipeMe.render_recipe_show_info(data);
  })
  .fail(function(data) {
    console.log("error");
  })
};

// renders the div for display on the index page
RecipeMe.render_recipe_show_info = function(recipe) {
  var current_recipe = recipe,
      $content = $('#content'),
      $container = $('<div class="container">'),
      $container_header = $('<div class="page-header">'),
      $recipe_title = $('<h1 class="recipe-title">' +  recipe.title + '</h1>'),
      $recipe_img = $('<img class="recipe-show-img" src=' + recipe.imageurl + '>'),
      $ingredients_header = $('<h2>Ingredients</h2>'),
      $recipe_ingredient_list = RecipeMe.list_ingredients_for_recipe(recipe.ingredientlist),
      $recipe_show_content = $('<div class="col-sm-8 recipe-show" id="recipe_' + recipe.id + '">'),
      $recipe_ingredient_list,
      $recipe_side_bar;

  $content.text("");
  $recipe_side_bar = RecipeMe.render_side_bar(current_recipe);

  $container_header.append($recipe_img, $recipe_title);
  $recipe_show_content.append($container_header);
  $recipe_show_content.append($ingredients_header, $recipe_ingredient_list);
  $container.append($recipe_show_content, $recipe_side_bar);
  $content.append($container);

};

// renderd the lsit of recipes
RecipeMe.list_ingredients_for_recipe = function(ingredients){
  var ingredients = ingredients.split(':'),
    i = 0,
    $ingredient_table = $('<table class="table">'),
    $ingredient_table_body = $('<tbody>');

  // Put table together
  $ingredient_table.append($ingredient_table_body);

  for(; i < ingredients.length; i++) {
      var $row = $('<tr>'),
        $td = $('<td>'),
        ingredient = ingredients[i];
      $td.append('<p class="lead">' + ingredients[i] + '</p>');
      $row.append($td);
      $ingredient_table_body.append($row);
    }
  return $ingredient_table;
};


RecipeMe.render_side_bar = function(recipe){
  var this_recipe = recipe,
      $fav_button = $('<button class="btn btn-custom btn-block">Add favorite</button>'),
      $recipe_external_url = $('<a class="btn btn-block btn-custom margin-bottom" id="recipe_url_' + recipe.id + '" href="http://www.yummly.com/recipe/external/' + recipe.yummlyid + '">View Recipe</a>'),
      $side_bar_div = $('<div class="col-sm-3 col-sm-offset-1 recipe-side-bar" id="recipe_side_bar' + recipe.id + '">'),
      $side_bar_header = $('<div class="page-header side-bar-header"></div>');

  RecipeMe.get_favorites(function(data) {
    for(var i = 0, l = data.length; i < l; i++) {
      if (data[i].yummlyid === recipe.yummlyid) {
        $fav_button.removeClass('btn-custom');
        $fav_button.addClass('btn-danger');
        $fav_button.text('Remove favorite');
      }
    }
  });

  $fav_button.click(function(event) {
    event.preventDefault();
    RecipeMe.add_favorite(this_recipe);
    RecipeMe.render_recipe_show_info(this_recipe);
    return false;
  });

  $side_bar_div.append($side_bar_header, $fav_button, $recipe_external_url);
  return $side_bar_div;
}







