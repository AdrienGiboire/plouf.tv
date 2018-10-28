Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks' }

  #root to: 'pages#home'
  root to: 'pages#programmation'

  get :programmation, to: 'pages#programmation'

  get :salty_ranked, to: 'salty_ranked#index'
end
