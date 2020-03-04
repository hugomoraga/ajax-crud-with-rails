Rails.application.routes.draw do
  resources :comments
  get 'mushrooms', to: 'mushrooms#index'
  root 'mushrooms#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
