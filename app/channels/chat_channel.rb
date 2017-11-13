class ChatChannel < ApplicationCable::Channel
  def subscribed
    # current_user_id = current_user.id
    stream_from "chat_channel"
    # stream_from "chat_#{params[:usr]}"

    if defined?(current_user)
      puts 'user exists ' + current_user.id.to_s
    else
      puts 'user doesnt exist'
    end
    # puts 'streaming for this current_user obj  '+ current_user
    # puts 'streaming for this current_user id  '+ current_user.id
    stream_from "chat_channel_" + current_user.id.to_s
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
