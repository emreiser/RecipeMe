var RecipeMe = RecipeMe || {}

RecipeMe.addRecipe = function(recipe) {
	$.ajax({
		url: '/recipes',
		type: 'POST',
		dataType: 'json',
		data: {recipe: {title: recipe.recipeName, imageurl: recipe.smallImageUrls[0], ingredientlist: recipe.ingredients.join(':'), yummlyid: recipe.id}},
	})
	.done(function(data) {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

};
