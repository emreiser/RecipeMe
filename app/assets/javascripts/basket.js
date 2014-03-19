var RecipeMe = RecipeMe || {};

RecipeMe.renderBasket = function(basket) {
	var $basket_element = $('<div class="basket-class" id="basket_' + basket.id + '" >');

	RecipeMe.setCookie(basket.id);
	$("#basket-container").append($basket_element);
	$basket_element.text("");
	$('button.ingredient').click(function(event) {
		event.preventDefault();
		var ingredient_id = event.target.id.split('_')[1];
		RecipeMe.toggleIngredient(basket.id, ingredient_id);
		return false;
		});
};

RecipeMe.updateBasket = function(callback) {
	$.ajax({
		url: '/baskets/' + basket_id,
		type: 'PUT',
		dataType: 'json',
		data: { basket: {id: basket_id }}
	})
	.done(function(data) {
		callback(data);
	});
};
