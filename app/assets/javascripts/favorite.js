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
  });
};

RecipeMe.add_favorite = function(recipe) {
  if (typeof recipe.id === 'number') {
    var id_number = recipe.id;
  } else {
    id_number = null;
  }
  $.ajax({
    url: '/recipes/' + recipe.id,
    type: 'POST',
    dataType: 'json',
    data: { number: id_number }
  })
  .done(function(data) {
    if (data.redirect_to) {
      $('body').data('favorite', true);
      window.location.pathname = data.redirect_to;
    }
  });
};

