var RecipeMe = RecipeMe || {};

RecipeMe.get_favorites = function(callback){
  $.ajax({
    url: '/recipes',
    type: 'GET',
    dataType: 'json',
    // data: {param1: 'value1'},
  })
  .done(function(data) {
    callback(data);
  })
  .fail(function(data) {
    console.log("error");

  })
  .always(function() {
    console.log("complete");
  });

};

RecipeMe.add_favorite = function(recipe) {
  $.ajax({
    url: '/recipes/' + recipe.id,
    type: 'GET',
    dataType: 'json',
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}
