class GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:new, :destroy, :create, :edit, :update]
  def index
    # @groups = Group.all #update to only shows group of this user.
    @groups = current_user.groups.all
    # render json: @groups
  end

  def show
    @group = current_user.groups.find(:id)
  end

  def new
    @group = Group.new
  end

  def create
    current_user.groups.create(params.require(:group).permit(:name))
    # redirect_to root_path
    redirect_to groups_path

  end

  def edit
    @group = Group.find(params[:id])
  end

  def destroy
    # @deleted_group = Group.find(params[:id])
    # @deleted_group.destroy
    Group.destroy(params[:id])
    redirect_back fallback_location:root_path
    # redirect_to groups_path
  end

  def update
    @group = Group.find(params[:id])
    @group.update(params.require(:group).permit(:name))
    # current_user.groups.update(params.require(:group).permit(:name))
    redirect_to groups_path
  end
end
