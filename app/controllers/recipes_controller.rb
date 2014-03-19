class RecipesController < ApplicationController
  def index
    if user_signed_in?
      if session[:favorite_recipe]
        new_recipe = session[:favorite_recipe]
        current_user.addFavorite(new_recipe)
      end
      @recipes = current_user.recipes
    else
      @recipes = []
    end
    render json: @recipes
  end

  def create
  	@recipe = Recipe.new(recipe_params)
  	if @recipe.save
  	  @recipe
    else
      @recipe = Recipe.find_by_yummlyid(recipe_params[:yummlyid])
    end
    render json: @recipe
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe
  end

  def favorite
    if params[:number] != ''
      recipe = Recipe.find(params[:id])
    else
      recipe = Recipe.find_by_yummlyid(params[:id])
    end
    self.toggleFavorite
  end

  private

  def recipe_params
  	params.require(:recipe).permit(:title, :imageurl, :ingredientlist, :yummlyid)
  end
end
