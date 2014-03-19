class Recipe < ActiveRecord::Base
  has_and_belongs_to_many :users
  validates :yummlyid, uniqueness: true

  def toggleFavorite
	  if user_signed_in?
      if current_user.recipes.uniq.include? self
        current_user.recipes.delete(self)
      else
        current_user.recipes << self
      end
      render json: current_user.recipes
    else
      session[:favorite_recipe] = self
      render json: {redirect_to: new_user_session_path}
    end
	end

	def addFavorite(recipe)
		if !self.recipes.include? recipe
      self.recipes << recipe
    end
	end
end
