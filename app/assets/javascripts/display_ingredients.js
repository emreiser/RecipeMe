var RecipeMe = RecipeMe || {};

RecipeMe.getIngredients = function() {
  $.ajax({
    url: '/ingredients',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(data) {
    console.log("success");
    RecipeMe.displayIngredients(data);
  })
  .fail(function(data) {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

};


RecipeMe.displayIngredients = function(ingredients_list) {
  var $nav_tabs = $('<ul class="nav nav-tabs" id="myTab">'),
      $protein_tab = $('<li class="active"><a href="#protein" data-toggle="tab">Protein</a></li>'),
      $vegetable_tab = $('<li><a href="#vegetable" data-toggle="tab">Vegetable</a></li>'),
      $sauce_tab = $('<li><a href="#sauce" data-toggle="tab">Sauce</a></li>'),
      $spice_tab = $('<li><a href="#spice" data-toggle="tab">Spice</a></li>'),
      $dairy_tab = $('<li><a href="#dairy" data-toggle="tab">Dairy</a></li>'),
      $starch_tab = $('<li><a href="#starch" data-toggle="tab">Starch</a></li>'),
      $content = $('#content'),
      $tab_content = $('<div class="tab-content" id="myTabContent">'),
      $protein_pane = $('<div class="tab-pane active" id="protein"></div>'),
      $vegetable_pane = $('<div class="tab-pane" id="vegetable"></div>'),
      $sauce_pane = $('<div class="tab-pane" id="sauce"></div>'),
      $spice_pane = $('<div class="tab-pane" id="spice"></div>'),
      $dairy_pane = $('<div class="tab-pane" id="dairy"></div>'),
      $starch_pane = $('<div class="tab-pane" id="starch"></div>'),
      $ingred_div = $('<div class="col-sm-8" id="ingred-div"><div class="page-header"><h1>Your Ingredients</div></div>'),
      $basket_container = $('<div class="col-md-4" id="basket-container"><div class="page-header"><h1>Your Basket</h1></div></div>'),
      $basket_button = $('<button id="find-recipe" class="btn btn-block btn-custom margin-bottom ingredient disabled">Find Recipes</button>'),
      $find_recipe_button_div = $('<div id="find-recipe-button-div" class="col-sm-6">'),
      $basket_button_div = $('<div id="basket-button-div" class="col-sm-12">'),
      $clear_basket_button = $('<button id="clear-basket" class="btn btn-block btn-danger ingredient">Clear Basket</button>'),
      $clear_basket_button_div = $('<div id="clear-basket-button-div" class="col-sm-6">'),
      $container_div = $('<div class="container">'),
      $div_row = $('<div class="row">'),
      i = 0,
      l = ingredients_list.length,
      basket_id;

  $content.text("");

  $tab_content.append($protein_pane, $vegetable_pane, $sauce_pane, $spice_pane, $dairy_pane, $starch_pane);
  $nav_tabs.append($protein_tab, $vegetable_tab, $sauce_tab, $spice_tab, $dairy_tab, $starch_tab);
  $ingred_div.append($nav_tabs, $tab_content);
  $clear_basket_button_div.append($clear_basket_button);
  $find_recipe_button_div.append($basket_button);
  $div_row.append($find_recipe_button_div, $clear_basket_button_div)
  $basket_button_div.append($div_row);
  $basket_container.append($basket_button_div);
  $container_div.append($ingred_div, $basket_container);
  $content.append($container_div);


  for(; i < l; i++) {
    var basket,
        ingredient = ingredients_list[i];

    if (ingredient.ingred_type === "protein") {
      $("#" + ingredient.ingred_type).append($('<button class="btn btn-danger btn-block ingredient" data-toggle="button" id="ingredient_' + ingredient.id + '">' + ingredient.name + '</button>'));
    } else if (ingredient.ingred_type === "vegetable") {
      $("#" + ingredient.ingred_type).append($('<button class="btn btn-success btn-block ingredient" data-toggle="button" id="ingredient_' + ingredient.id + '">' + ingredient.name + '</button>'));
    } else if (ingredient.ingred_type === "sauce") {
      $("#" + ingredient.ingred_type).append($('<button class="btn btn-primary btn-block ingredient" data-toggle="button" id="ingredient_' + ingredient.id + '">' + ingredient.name + '</button>'));
    } else if (ingredient.ingred_type === "spice") {
      $("#" + ingredient.ingred_type).append($('<button class="btn btn-info btn-block ingredient" data-toggle="button" id="ingredient_' + ingredient.id + '">' + ingredient.name + '</button>'));
    } else if (ingredient.ingred_type === "starch") {
      $("#" + ingredient.ingred_type).append($('<button class="btn btn-warning btn-block ingredient" data-toggle="button" id="ingredient_' + ingredient.id + '">' + ingredient.name + '</button>'));
    } else {
      $("#" + ingredient.ingred_type).append($('<button class="btn btn-default btn-block ingredient" data-toggle="button" id="ingredient_' + ingredient.id + '">' + ingredient.name + '</button>'));
    }

  };

  basket = RecipeMe.createBasket();

  $('#find-recipe').click(function(event){
    var basket_element = $('.basket-class' ),
        basket_id = basket_element[0].id.split('_')[1];
        // debugger;
        recipe_container_element = '<div id="recipes-index-content">';
    $('#content').text("");
    $('#content').append(recipe_container_element);
    RecipeMe.look_up_basket(basket_id);

  });


  $('#clear-basket').click(function(event){
    var basket_element = $('.basket-class' ),
        basket_id = basket_element[0].id.split('_')[1];
    RecipeMe.clear_basket(basket_id);
  });

};






