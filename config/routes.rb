RecipeMe::Application.routes.draw do
  devise_for :users
  root to: 'home#index'
  resources :ingredients, only: :index
  resources :baskets
  resources :yummly, only: :index
  resources :user, only: :show
end
