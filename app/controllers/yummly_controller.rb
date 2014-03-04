class YummlyController < ApplicationController
  def index
    api_id = ENV["APP_ID"]
    api_key = ENV["APP_KEY"]
    ingredent_list_from_basket = params[:ingredients]

    yummly_url = "http://api.yummly.com/v1/api/recipes?_app_id=#{api_id}&_app_key=#{api_key}&q=#{ingredent_list_from_basket}"

    response = HTTParty.get(yummly_url)
  
  end
end
