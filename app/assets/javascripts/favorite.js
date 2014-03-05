var RecipeMe = RecipeMe || {};

RecipeMe.get_favorites = function(){
  $.ajax({
    url: '/recipes',
    type: 'GET',
    dataType: 'json',
    // data: {param1: 'value1'},
  })
  .done(function(data) {
    console.log("success");
    var i = 0 , l = data.length,
        favorite_array = [];
    for (; i < l; i++){
       favorite_array.push(data[i].id);
    }
    return favorite_array;
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

RecipeMe.toggle_favorite = function(recipe, favorite_array){
  var $container_div = $('<div class="container">'),
      index = favorite_array.indexOf(recipe.id);
  if ($.inArray(recipe.id, favorite_array)){
    favorite_array.remove(index);
  } else {
    favorite_array.push(recipe.id);
  };

  RecipeMe.renderRecipe(recipe, $container_div, favorite_array);
}