class GroupRestaurant < ApplicationRecord
  belongs_to :restaurant
  belongs_to :group
end
