class BasketsController < ApplicationController
	def new
		if user_signed_in?
			@basket = current_user.baskets.new
		else
			@basket = Basket.new
		end
		render json: @basket
	end

	def create
		if user_signed_in?
			@basket = Basket.create(user_id: current_user.id)
		else
			@basket = Basket.create()
		end
		render json: @basket
	end

	def edit
		@basket = Basket.find(params[:id])
		@basket.ingredients = [];
		render json: @basket
	end

	def update
		ingredients = Basket.find(params[:id]).ingredients
		if params[:basket][:ingredient]
			ingredient = Ingredient.find(params[:basket][:ingredient])
			if ingredients.include?(ingredient)
				ingredients.delete(ingredient)
			else
				ingredients << ingredient
			end
		end
		render json: ingredients
	end

end
