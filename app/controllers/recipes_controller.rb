class RecipesController < ApplicationController
  def index
    @recipes = current_user.recipes || []
    render json: @recipes
  end
end
