class RecipesController < ApplicationController
  def index
    if user_signed_in?
      @recipes = current_user.recipes
    else
      @recipes = []
    end
    render json: @recipes
  end
  def create
  	@recipe = Recipe.new(recipe_params)
  	@recipe.save
  	render json: @recipe
  end

  private

  def recipe_params
  	params.require(:recipe).permit(:title, :imageurl, :ingeredientlist, :yummlyid)
  end
end
