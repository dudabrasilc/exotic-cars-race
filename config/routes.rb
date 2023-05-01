Rails.application.routes.draw do
  resources :race_tracks, only: [:index]
  resources :cars, only: [:index, :show, :create]
  resources :races, only:[:index, :create, :destroy, :update, :show]
  resources :users, only: [:show, :create]
  resources :races_cars, only: [:index, :create, :destroy]

  get '/cars/:id', to: "cars#show"
  # get '/race/:id/races_cars', to: "teams#team_team_pokemons"
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
