class GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:new, :destroy, :create, :edit, :update]
  def index
    @groups = Group.all #update to only shows group of this user.
    # render json: @groups
  end

  def show
    @group = Group.find(:id)
  end

  def new
  end

  def create
    Group.create(
      name: params[:name]
      #add email.

    )
  end

  def edit
    @group = Group.find(:id)
  end

  def destroy
  end

  def update
  end
end
