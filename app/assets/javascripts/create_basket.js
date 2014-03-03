var RecipeMe = RecipeMe || {};

RecipeMe.buildBasket = function() {
	$.ajax({
		url: '/ingredients',
		type: 'GET',
		dataType: 'json',
		//data: {param1: 'value1'},
	})
	.done(function(data) {
		console.log("success");
		RecipeMe.displayIngredients(data);
	})
	.fail(function(data) {
		debugger;
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

};


RecipeMe.displayIngredients = function(ingredients_list) {
	var $nav_tabs = $('<ul class="nav nav-tabs">'),
			$protein_tab = $('<li><a href="#protein" data-toggle="tab">protein</a></li>'),
			$vegetable_tab = $('<li><a href="#vegetable" data-toggle="tab">Vegetable</a></li>'),
			$sauce_tab = $('<li><a href="#sauce" data-toggle="tab">Sauce</a></li>'),
			$spice_tab = $('<li><a href="#spice" data-toggle="tab">Spice</a></li>'),
			$dairy_tab = $('<li><a href="#dairy" data-toggle="tab">Dairy</a></li>'),
			$starch_tab = $('<li><a href="#starch" data-toggle="tab">Starch</a></li>'),
			$content = $('#content');

	$content.text("");






};
