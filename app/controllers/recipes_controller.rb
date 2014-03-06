class RecipesController < ApplicationController
  def index
    if user_signed_in?
      if session[:favorite_recipe]
        new_recipe = session[:favorite_recipe]
        if !current_user.recipes.include? new_recipe
          current_user.recipes << new_recipe
        end
      end
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

  def favorite
    recipe = Recipe.find_by_yummlyid(params[:id])
    if user_signed_in?
      if current_user.recipes.uniq.include? recipe
        current_user.recipes.delete(recipe)
      else
        current_user.recipes << recipe
      end
      render json: current_user.recipes
    else
      session[:favorite_recipe] = recipe
      render json: {redirect_to: new_user_session_path}
    end
  end

  private

  def recipe_params
  	params.require(:recipe).permit(:title, :imageurl, :ingredientlist, :yummlyid)
  end
end
