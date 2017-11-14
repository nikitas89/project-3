class WelcomeController < ApplicationController
  def index
    @groups = current_user.groups.all if user_signed_in?
  end
end
