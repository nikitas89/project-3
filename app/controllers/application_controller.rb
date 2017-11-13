
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
# before_action :configure_permitted_parameters_edit, if: :devise_controller?
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])

  end

end






#if change for account_update prefix.
# def configure_permitted_parameters_edit
#   devise_parameter_sanitizer.permit(:account_update, keys: [:name])
#   # devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :address, :contact_number])
# end
