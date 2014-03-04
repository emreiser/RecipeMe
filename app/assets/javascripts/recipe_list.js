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
  debugger;
  var i = 0, ingredient_list = "";
  for(; i < data.length; i++) {
      var ingredient = data[i];
      ingredient_list += ingredient.name + "+";
    }
  RecipeMe.request_recipies(ingredient_list);
};

//Runs set_up_div_container and make API call for the recipies
RecipeMe.request_recipies = function(ingredent_list_from_basket) {
  $.ajax({
    url: '/yummly',
    type: 'GET',
    dataType: 'json',
    data: {ingredients: ingredent_list_from_basket }
  })
  .done(function(data) {
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
RecipeMe.render_all = function(recipes) {
  $('#recipes-index-content').empty();
  var recipe_number = recipes.length, i;
  for(i = 0; i < recipe_number; i++) {
    this.render_one(recipes[i]);
  }
};

// renders the div for display on the index page
RecipeMe.render_one = function(recipe, i) {
  var recipe_element;
      recipe_element = '<div id= "recipe_'+ i +'">';
      recipe_element += '<a '+ 'href="' + 'http://www.yummly.com/recipe/external/' + recipe.id + '">' +' Link to Preparation </a>';
      recipe_element += '<button class="fav" id="fav_recipe_' + i + '"> fav it? </button>';
  $('#recipes-index-content').append(recipe_element);
};







