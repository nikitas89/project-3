require 'json'

class GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:new,:show, :destroy, :create, :edit, :update, :add, :join]
  def index
    @group = Group.new
    @groups = current_user.groups.all
  end

  def show
    @group = current_user.groups.find(params[:id])
    # @group = Group.find(:id)
    @group_users = @group.users.all
  end

  def new
    @group = Group.new
  end

  def create
    group = current_user.groups.create(params.require(:group).permit(:name))
    if group.save
    # redirect_to messages_url
    # ActionCable.server.broadcast 'chat_channel',
    #                              content:  group.name,
    #                              username: current_user.name
                                 # customise to group invite etc. group ID.
    else
      redirect_to groups_path
    end
    # redirect_to root_path
  end

  def edit
    @group = Group.find(params[:id])
  end

  def destroy
    #broadcast changes to group program js /FE

    @deleted_group = Group.find(params[:id])
    @deleted_group_users = @deleted_group.users.all

    @deleted_group_name = @deleted_group.name
    @deleted_group.destroy
    # Group.destroy(params[:id])
# broadcast the deleted group and which user did it.
    # ActionCable.server.broadcast 'chat_channel',
    #                                content:  @deleted_group_name,
    #                                username: current_user.name,
    #                                status: 2
    @deleted_group_users.each do |user|
      # UserChannel.broadcast_to(user, { notification: 'Test message' })
      ActionCable.server.broadcast "chat_channel_#{user.id}",
                                    content:  @deleted_group_name,
                                    username: current_user.name,
                                    status: 2,
                                    mention: true,
                                    notification: 'Test message'

    end
    # redirect_back fallback_location: root_path
    # redirect_to groups_path
  end

  def update
    @group = Group.find(params[:id])
    @group.update(params.require(:group).permit(:name))
    redirect_to groups_path
  end

  def add
    # check that grp exists, if so find the group, otherwise red. to groups index
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
      current_user.groups << Group.find(params[:id])
      # UserChannel.broadcast_to(user, { notification: 'Test message' })
      ActionCable.server.broadcast 'chat_channel',
                                   content:  current_user.groups.last,
                                   username: current_user.name,
                                   status: 1
      redirect_to groups_path
    end
  end #end join

  def locations
    #try with hardcoded group
    # @group = current_user.groups.find(params[:id])
    @group = current_user.groups.find(25)
    #use scopes in the user model.
    @group_users = @group.users.all
    @group_locations = []
    @group_users.each do |user|
      # if defined?(user.params)
      #check if current users' params are defined.
        puts user.name
        puts params
        # add hard coded location to mimic multiple locations
        @group_locations << { "lat"=>params[:lat], "lng"=>params[:lng] }
      # end #end if
    end #endeach
    puts @group_locations
  end #end loc

end
