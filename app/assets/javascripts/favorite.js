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