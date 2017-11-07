class UsersController < ApplicationController
  def index
    @all_users = User.all
  end

  def show
    # @user = Users
  end
end
