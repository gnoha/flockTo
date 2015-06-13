Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    get 'flocks/nearbys', :to => 'flocks#find_nearbys'
    resources :flocks, only: [:index, :show, :create, :update, :destroy]
    resources :events, only: [:index, :show, :create, :update, :destroy]
    resources :users, only: [:show, :update]
    resources :attendings, only: [:index, :create, :destroy]

    # resources :attending
    # resources :organization
  end
end
