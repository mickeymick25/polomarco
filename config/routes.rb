Rails.application.routes.draw do
	
 	unauthenticated do
		root to: "visitors#index", as: :unauthenticated_root
		post "subscribe" => 'visitors#subscribe'
	end

	authenticated :user do
		root to: "dashboard#index", as: :authenticated_root
		get 'dashboard/data', to: 'dashboard#data', :defaults => { :format => 'json' }
	end

 	root to: 'visitors#index'
  	devise_for :users
  	resources :users
end
