class CreateGroupRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :group_restaurants do |t|
      t.references :restaurant, foreign_key: true
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end
