var RecipeMe = RecipeMe || {};

RecipeMe.createBasket = function() {
	var cookies = this.searchCookies(document.cookie),
		one_d_cookies = [];

	if (cookies) {
		for (var i = 0, l = cookies.length; i < l; i++) {
			one_d_cookies.push(cookies[i][0]);
		}
	}
	if (($.inArray('basket_id', one_d_cookies)) !== -1 ) {
		var index = ($.inArray('basket_id', one_d_cookies)),
			basket_id = cookies[index][1];
		if (basket_id !== 'undefined') {
			RecipeMe.updateBasket(basket_id, function(data) {
				var basket_element = $('<div class="basket-class" id="basket_' + basket_id + '" >');
				RecipeMe.setCookie(basket_id);
				RecipeMe.button_check(data);
				$("#basket-container").append(basket_element);
				basket_element.text("");
				RecipeMe.renderIngredients(data, basket_id);
				$('button.ingredient').click(function(event) {
					event.preventDefault();
					var ingredient_id = event.target.id.split('_')[1];
					RecipeMe.toggleIngredient(basket_id, ingredient_id);
					RecipeMe.button_check(ingredient_id);
					return false;
				});

			});
		} else {
			$.ajax({
				url: '/baskets',
				type: 'POST',
				dataType: 'json',
			})
			.done(function(data){
				RecipeMe.renderBasket(data);
			});
		}
	} else {
		$.ajax({
			url: '/baskets',
			type: 'POST',
			beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
			dataType: 'json',
		})
		.done(function(data) {
			RecipeMe.renderBasket(data);
		});
	}
};

RecipeMe.toggleIngredient = function(basket_id, ingredient_id) {
	$.ajax({
		url: '/baskets/' + basket_id,
		type: 'PUT',
		dataType: 'json',
		data: { basket: {id: basket_id, ingredient: ingredient_id }}
	})
	.done(function(data) {
		RecipeMe.renderIngredients(data, basket_id);
		RecipeMe.button_check(data);
	});
};

RecipeMe.handleData = function(basket) {
	var new_basket = basket;
	return new_basket;
};

RecipeMe.renderIngredients = function(ingredients, basket_id) {
	var i = 0,
			ingredients_length = ingredients.length,
			new_element,
			element = $("#basket_" + basket_id).text("");

	for(; i < ingredients_length; i++) {
		var ingredient = ingredients[i];
		RecipeMe.renderIngredient(element, ingredient);
	}
};

RecipeMe.renderIngredient = function(container, ingredient) {
	if(ingredient.ingred_type === 'protein'){
		new_element = $('<p class="text-danger basket_ingredient lead" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'vegetable'){
		new_element = $('<p class="text-success basket_ingredient lead" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'sauce'){
		new_element = $('<p class="text-primary basket_ingredient lead" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'spice'){
		new_element = $('<p class="text-info basket_ingredient lead" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else if(ingredient.ingred_type === 'starch'){
		new_element = $('<p class="text-warning basket_ingredient lead" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	} else {
		new_element = $('<p class="text-muted basket_ingredient lead" id="basket_ingredient_' + ingredient.id + '">');
		new_element.text(ingredient.name);
	}

	container.append(new_element);
	$('#basket_ingredient_' + ingredient.id).click(function(event){
		var id;
		id = container[0].id;
		id = id.split("_")[1];

		RecipeMe.toggleIngredient(id, ingredient.id);
	});
};


RecipeMe.setCookie = function(id) {
	document.cookie = "basket_id=" + escape(id);
};

RecipeMe.searchCookies = function(cookies) {
	var cookie_array = cookies.split('; '),
		cookie_split_array = [],
		i = 0,
		l = cookie_array.length;
	for (; i < l; i++) {
		cookie_split_array.push(cookie_array[i].split('='));
	}
	return cookie_split_array;
};
