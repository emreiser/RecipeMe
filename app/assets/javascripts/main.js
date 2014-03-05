var RecipeMe = RecipeMe || {};

RecipeMe.buildHomepage = function() {
	var $content_div = $('#content'),
		$image_div = $('<div class="img-bg">'),
		$inner_img_content = $('<div class="boxy col-md-6 col-md-offset-3 img-content">'),
		$content_title = $('<h1>Welcome To RecipeMe</h1>'),
		$content_subtitle = $("<h2>We'll help you find recipes with the ingredients you have</h2>"),
		$content_btn = $("<button class='btn btn-primary btn-lg' id='enter-ingreds'>Enter Ingredients</button>"),
		$flash = $('.flash');

	$content_div.text("");
	$inner_img_content.append($content_title, $content_subtitle, $content_btn);
	$image_div.append($inner_img_content);
	$content_div.append($image_div);
	$content_btn.click(function(event) {
		RecipeMe.getIngredients();
		$flash.text("");
	});
};
