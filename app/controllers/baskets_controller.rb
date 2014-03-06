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
		@basket = Basket.find(params[:id])
		if params[:basket][:ingredient]
			ingredient = Ingredient.find(params[:basket][:ingredient])
			if @basket.ingredients.include?(ingredient)
				@basket.ingredients.delete(ingredient)
				@basket.ingredients
			else
				@basket.ingredients << ingredient
			end
		end
		render json: @basket.ingredients
	end

end
