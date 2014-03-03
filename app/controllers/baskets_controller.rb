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
		binding.pry
		@basket = Basket.find(params[:id])
		render json: @basket
	end

	def update
		@basket = Basket.find(params[:id])
		@basket.ingredients << Ingredient.find(params[:basket][:ingredient])
		render json: @basket.ingredients
	end
end
