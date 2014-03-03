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
		@basket = Basket.find(params[:id])
	end
end
