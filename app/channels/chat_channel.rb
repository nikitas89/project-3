class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
    stream_from "chat_#{current_user.id}"
    # stream_from "chat_#{params[:room]}"
    # groups = Group.first
    # stream_for groups

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
