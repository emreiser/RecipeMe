var RecipeMe = RecipeMe || {};

RecipeMe.createBasket = function() {
	$.ajax({
		url: '/baskets',
		type: 'POST',
		dataType: 'json',
	})
	.done(function(data) {
		var basket = data;
		//return RecipeMe.handleData(basket);
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
		debugger;
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
