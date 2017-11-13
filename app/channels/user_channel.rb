class UserChannel < ApplicationCable::Channel
  def subscribed
    # stream_for current_user
    # puts current_user.id
  end
end
