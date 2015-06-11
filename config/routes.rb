Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :flocks, only: [:index, :show, :create, :update, :destroy]
    resources :events, only: [:index, :show, :create]
    resources :users, only: [:show, :update]
    # resources :attending
    # resources :organization
  end
end
