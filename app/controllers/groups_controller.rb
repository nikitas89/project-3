require 'json'

class GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:new, :show, :destroy, :create, :edit, :update, :add, :join]
  def index
    @group = Group.new
    @groups = current_user.groups.all
  end

  def show
    @group = current_user.groups.find(params[:id])
    @group_users = @group.users.all
    @groups = current_user.groups.all
  end

  def new
    @group = Group.new
  end

  def create

    group = current_user.groups.create(params.require(:group).permit(:name))
    if group.save
      # redirect_to messages_url
      ActionCable.server.broadcast 'chat_channel',
                                   content:  group.name,
                                   username: current_user.name
    else
      redirect_to groups_path
    end
    # redirect_to root_path
  end

  def edit
    @group = Group.find(params[:id])
    @groups = current_user.groups.all
  end

  def destroy
    # broadcast changes to group program js /FE
    @deleted_group = Group.find(params[:id])
    @deleted_group_users = @deleted_group.users.all
    @deleted_group_user_ids = []
    @deleted_group_users.each do |user|
      @deleted_group_user_ids << user.id
    end
    @deleted_group_name = @deleted_group.name
    @deleted_group.destroy
    @deleted_group_user_ids.each do |user|
      puts 'user id is inside : @deleted_group_user_ids'
      puts user
      ActionCable.server.broadcast "chat_channel_#{user}",
                                   content:  @deleted_group_name,
                                   username: current_user.name,
                                   status: 2,
                                   mention: true,
                                   notification: 'Test message'
    end
    redirect_back fallback_location: root_path
    redirect_to groups_path
  end

  def update
    @group = Group.find(params[:id])
    @group.update(params.require(:group).permit(:name))
    @group_users = @group.users.all
    @group_users.each do |user|
      ActionCable.server.broadcast "chat_channel_#{user.id}",
                                   content:  @group.name,
                                   username: current_user.name,
                                   status: 3,
                                   mention: true,
                                   notification: 'Test message'
    end
    redirect_to groups_path
  end

  def add
    @groups = current_user.groups.all
    if Group.exists?(params[:id])
      @group = Group.find(params[:id])
    else
      redirect_to groups_path
    end
  end

  def join
    # check that user  not already in grp
    if current_user.groups.exists?(params[:id])
      redirect_to groups_path
      # add flash message "You are already in this group"
    else
      @group = Group.find(params[:id])
      current_user.groups << @group
      @group_users = @group.users.all
      @group_users.each do |user|
        ActionCable.server.broadcast "chat_channel_#{user.id}",
                                     content:  @group.name,
                                     username: current_user.name,
                                     status: 1
      end
      redirect_to groups_path
    end
  end # end join

  def locations
    # TODO: send groups from front end
    # @group = current_user.groups.find(params[:id])
    @group = current_user.groups.find(35)
    @group_users = @group.users.all
    @group_locations = []
    @group_users.each do |user|
      next unless defined?(user.lat)
      @group_locations << { 'lat' => user.lat, 'lng' => user.lng }
      # also avail over sockets
      ActionCable.server.broadcast "chat_channel_#{user.id}",
                                   location: { 'lat' => user.lat, 'lng' => user.lng }
    end # endeach
    puts @group_locations
    render 'new'
    # view = ActionView::Base.new(ActionController::Base.view_paths, {})
    # view.render(file: '/welcome/index.html.erb')
    gon.group_locations = @group_locations
  end # end loc
end
