Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks' }

  root to: 'pages#home'

  get :heroes_picker, to: 'heroes_picker#index'

  get :programmation, to: 'pages#programmation'

  get :salty_ranked, to: 'salty_ranked#index'
end
