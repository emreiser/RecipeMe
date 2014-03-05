RecipeMe::Application.routes.draw do
  devise_for :users
  root to: 'home#index'
  resources :ingredients, only: :index
  resources :baskets
  resources :yummly, only: :index

  resources :recipes, only: [:index, :create]
  get '/recipes/:id', to: 'recipes#favorite', as: 'favorite_recipe'
end
