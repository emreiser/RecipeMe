// Send AJAX request from basket click handler - returns matching recipes
//Create function
//to create HTML for displaying recipes (2 functions, displayALL & displayOne)

var RecipeMe = RecipeMe || {};

// creates the div #recipes-index-content
RecipeMe.set_up_recipe_container = function() {
  recipe_container_element = '<div id="recipes-index-content">';
  $('#content').append(recipe_container_element);
};


// parses out the ingredients
RecipeMe.list_of_ingredients_for_search = function(basket) {
  ingredient_list = basket.ingredients
  RecipeMe.request_recipies(ingredient_list)
};

//Runs set_up_div_container and make API call for the recipies
RecipeMe.request_recipies = function(ingredent_list_from_basket) {
  RecipeMe.set_up_recipe_container();
  var sorted_recipes_array = [],
      app_key = ENV["APP_KEY"],
      app_id = ENV["APP_ID"],
      ingredent_list_from_basket = list_ingredients(basket);
  $.ajax({
    url: 'http://api.yummly.com/v1/api/recipes?_app_id='+ api_id +'&_app_key='+ api_key +'&q='+ ingredent_list_from_basket,
    type: 'GET',
    dataType: 'json',
    // data:
  })
  .done(function(data) {
    console.log("got recipes")
    RecipeMe.sort_recipe_score(data);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
};

// sorts the recipies and store them in an array
RecipeMe.sort_recipe_score = function(data) {
  //sort the recipies ?

  //add to array
  sorted_recipes_array.push(data);

  // call render on array
  RecipeMe.render_all(sorted_recipes_array);
  return sorted_recipes_array;
};

// iterates and runs over the array to render
RecipeMe.render_all = function(recipes) {
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







