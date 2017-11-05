# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do
  new_user = User.new
  new_user.name = Faker::HarryPotter.character
  new_user.email = Faker::Internet.email
  new_user.password = 'test123'
  new_user.save
end

Cuisine.create([{ name: 'Local' }, { name: 'Vegetarian' }, { name: 'Western' }, { name: 'Halal' }, { name: 'Thai' }])
5.times do
  new_group = Group.new
  new_group.name = Faker::StarWars.specie
  new_group.save
end

cuisines  = Cuisine.all
5.times do
  new_resto = Restaurant.new
  new_resto.name = Faker::Team.name
  new_resto.address = Faker::Address.street_address
  new_resto.phone = Faker::PhoneNumber.cell_phone
  new_resto.longitude =Faker::Address.longitude
  new_resto.latitude = Faker::Address.latitude
  new_resto.cuisine = cuisines.first
  new_resto.save
end
