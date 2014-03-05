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
RecipeMe.render_recipe_show_info = function(data) {
  var $recipe_show_div = $('<div id="recipe-show-div">'),
      $recipe_show_header = $('<h1 class="page-header recipe-title">' +  recipe.name + '</h1>'),
      $recipe_show_img = $('<img class="recipe-show-img" src=' + recipe.imageurl + '>'),
      $recipe_ingredient_list = RecipeMe.list_ingredients_for_recipe(recipe.ingredients),
      $recipe_show_content = $('<div class="class="col-sm-8 recipe-show" id="recipe' + recipe.id + '">'),
      $recipe_ingredient_list,
      $recipe_side_bar;

  $recipe_side_bar = RecipeMe.render_side_bar(recipe.ingredients);
  $recipe_ingredient_list = RecipeMe.list_ingredients_for_recipe(recipe.ingredients);

  $recipe_show_header.append($recipe_show_img)
  $recipe_show_content.append($recipe_show_header);
  $recipe_show_content.append($recipe_ingredient_list);
  $recipe_show_div.append($recipe_show_content, );
  container.append($recipe_show_div);

};

// renderd the lsit of recipes
RecipeMe.list_ingredients_for_recipe = function(ingredients){
  var i = 0,$recipe_ingredient_list = $('<ul class="recipe_ingredients">');
  for(; i < ingredients.length; i++) {
      var $list_element, ingredient = ingredients[i];
      $list_element = $('<li>' + ingredients[i] + '</li>');
      $recipe_ingredient_list.append( $list_element);
    }
  return $recipe_ingredient_list;
};


RecipeMe.render_side_bar = function(){

}







