class WelcomeController < ApplicationController
  def index
    @groups = (current_user.groups.all if user_signed_in?)

    @current_user = (current_user if user_signed_in?)
    gon.watch.current_user = @current_user
  end
end
