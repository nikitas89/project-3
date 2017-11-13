class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
    # stream_from "chat_#{params[:usr]}"
    # if defined?(current_user)
    #   puts 'user exists ' + current_user.id.to_s
    # else
    #   puts 'user doesnt exist'
    # end
    stream_from "chat_channel_" + current_user.id.to_s
  end

  def unsubscribed
  end
end
