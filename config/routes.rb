Rails.application.routes.draw do
  devise_for :users
  get 'welcome/index'
  root :to => "welcome#index"
  mount ActionCable.server, at: '/cable'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :update, :destroy]
  resources :groups, only: [:index, :show, :update, :destroy, :add, :join, :edit, :create, :new]
  get "/groups/:id/add" => "groups#add"
  post "/groups/:id" => "groups#join"
  post '/groups_locations/', to: 'groups#locations'

end
