class UsersController < ApplicationController
  def index
    @all_users = User.all
  end

  def show
    @user = User.find_by(name: params[:name])
  end

  def setLocation
    current_user.update_attributes(
      lat: params[:lat],
      lng: params[:lng]
    )
  end
end
