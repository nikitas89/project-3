class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
    stream_from "chat_channel_" + current_user.id.to_s
  end

  def unsubscribed
  end
end
