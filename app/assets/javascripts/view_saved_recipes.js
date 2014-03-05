$(document).ready(function() {
	$('#view_saved_recipes').click(function(event) {
		event.preventDefault();
		var $content = $('#content'),
			$container = $('<div class="container">'),
			$inner_content = $('<div class="col-sm-8">'),
			$header = $('<div class="page-header"><h1>Saved Recipes</h1></div>'),
			$table = $('<table class="table">'),
			$table_body = $('<tbody class="table-body">');

		$content.text("");
		$inner_content.append($header);
		$table.append($table_body);
		$inner_content.append($table);
		$container.append($inner_content);
		$content.append($container);

		RecipeMe.get_favorites(function(data) {

			$.each(data, function(index, value) {
				debugger;
				var $row = $('<tr>'),
					$td = $('<td>'),
					$table = $('.table-body');
				$td.append('<p class="lead"><a href="" id="' + value.yummlyid + '">' + value.title + '</a></p>');
				$row.append($td);
				$table.append($row);
			})
		});
		return false;
	});
});
