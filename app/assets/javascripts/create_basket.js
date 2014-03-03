var RecipeMe = RecipeMe || {};

RecipeMe.createBasket = function() {
	$.ajax({
		url: '/baskets',
		type: 'POST',
		dataType: 'json',
	})
	.done(function(data) {
		var basket = data;
		basket_element = $('<div id="basket_' + basket.id + '" >');
		$("#basket-container").append(basket_element);
		basket_element.text("");
		$('button.ingredient').click(function(event) {
			event.preventDefault();
			var ingredient_id = event.target.id.split('_')[1];
			RecipeMe.addIngredient(basket.id, ingredient_id);
			return false;
		});

		console.log("success");
	})
	.fail(function(data) {
		debugger;
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
};

RecipeMe.addIngredient = function(basket_id, ingredient_id) {
	$.ajax({
		url: '/baskets/' + basket_id,
		type: 'PUT',
		dataType: 'json',
		data: { basket: {id: basket_id, ingredient: ingredient_id }}
	})
	.done(function(data) {
		RecipeMe.renderIngredients(data, basket_id);
		console.log("success");
	})
	.fail(function(data) {
		debugger;
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
};

RecipeMe.handleData = function(basket) {
	var basket = basket;
	return basket;
}

RecipeMe.renderIngredients = function(ingredients, basket_id) {
	var i = 0,
			ingredients_length = ingredients.length,
			new_element,
			element = $("#basket_" + basket_id).text("");

	for(; i < ingredients_length; i++) {
		var ingredient = ingredients[i];
		RecipeMe.renderIngredient(element, ingredient);

		// new_element.click(function(event){
		// 	$(this).re
		// })
	}
};

RecipeMe.renderIngredient = function(container, ingredient) {
	if(ingredient.ingred_type === 'protein'){
		new_element = $('<p class="text-danger basket_ingredient" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'vegetable'){
		new_element = $('<p class="text-success basket_ingredient" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'sauce'){
		new_element = $('<p class="text-primary basket_ingredient" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'spice'){
		new_element = $('<p class="text-info basket_ingredient" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'starch'){
		new_element = $('<p class="text-warning basket_ingredient" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else {
		new_element = $('<p class="text-muted basket_ingredient" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	}

	container.append(new_element);
	$('#basket_ingredient_' + ingredient.id).click(function(event){
		var id;
		id = container[0].id;
		id = id.split("_")[1];

		RecipeMe.removeIngredient(id, ingredient.id);
	})
};

RecipeMe.removeIngredient = function(basket_id, ingredient_id) {
	$.ajax({
		url: '/baskets/' + basket_id,
		type: 'PUT',
		dataType: 'json',
		data: { basket: {id: basket_id, ingredient: ingredient_id }}
	})
	.done(function(data) {

		RecipeMe.renderIngredients(data, basket_id);
		console.log("success");
	})
	.fail(function(data) {

		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}




