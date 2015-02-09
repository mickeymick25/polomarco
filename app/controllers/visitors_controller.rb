require 'mailchimp'

class VisitorsController < ApplicationController
	before_action :setup_mcapi

	def setup_mcapi
		@mc = Mailchimp::API.new( ENV['MAILCHIMP_API_KEY'] )
	end

	def subscribe
		list_id = ENV['MAILCHIMP_LIST_ID']
		email = params['email']
		
		begin
			@mc.lists.subscribe(list_id, {'email' => email}, :double_optin=>false)
			flash[:notice] = "#{email} subscribed successfully"
			rescue Mailchimp::ListAlreadySubscribedError
			flash[:error] = "#{email} is already subscribed to the list"
			rescue Mailchimp::ListDoesNotExistError
			flash[:error] = "The list could not be found"
			redirect_to root_path
			return
			rescue Mailchimp::Error => ex
			
			if ex.message
				flash[:error] = ex.message
			else
				flash[:error] = "An unknown error occurred"
			end
		end
		redirect_to root_path
	end
end