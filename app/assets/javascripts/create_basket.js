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
		debugger;
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
	var $nav_tabs = $('<ul class="nav nav-tabs" id="myTab">'),
			$protein_tab = $('<li class="active"><a href="#protein" data-toggle="tab">Protein</a></li>'),
			$vegetable_tab = $('<li><a href="#vegetable" data-toggle="tab">Vegetable</a></li>'),
			$sauce_tab = $('<li><a href="#sauce" data-toggle="tab">Sauce</a></li>'),
			$spice_tab = $('<li><a href="#spice" data-toggle="tab">Spice</a></li>'),
			$dairy_tab = $('<li><a href="#dairy" data-toggle="tab">Dairy</a></li>'),
			$starch_tab = $('<li><a href="#starch" data-toggle="tab">Starch</a></li>'),
			$content = $('#content'),
			$tab_content = $('<div class="tab-content" id="myTabContent">'),
			$protein_pane = $('<div class="tab-pane active" id="protein"></div>');
			$vegetable_pane = $('<div class="tab-pane" id="vegetable"></div>');
			$sauce_pane = $('<div class="tab-pane" id="sauce"></div>');
			$spice_pane = $('<div class="tab-pane" id="spice"></div>');
			$dairy_pane = $('<div class="tab-pane" id="dairy"></div>');
			$starch_pane = $('<div class="tab-pane" id="starch"></div>'),
			$ingred_div = $('<div class="col-md-8" id="ingred-div">'),
			i = 0,
			l = ingredients_list.length;


	$content.text("");



	$tab_content.append($protein_pane, $vegetable_pane, $sauce_pane, $spice_pane, $dairy_pane, $starch_pane);
	$nav_tabs.append($protein_tab, $vegetable_tab, $sauce_tab, $spice_tab, $dairy_tab, $starch_tab);
	$ingred_div.append($nav_tabs, $tab_content);
	$content.append($ingred_div);

	for(; i < l; i++) {
		var ingredient = ingredients_list[i];
		debugger;
		// if (ingredient.ingred_type === "protein") {
		// 	$protein_pane.append(ingredient.name);
		// } else if (ingredient.ingred_type === "vegetable"){
		// 	$vegetable_pane.append(ingredient.name);
		// } else if (ingredient.ingred_type === "sauce") {
		// 	$sauce_pane.append(ingredient.name);
		// } else

		$("#" + ingredient.ingred_type).append($('<div>' + ingredient.name + '</div>'));

	};




};
