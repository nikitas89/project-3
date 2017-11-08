# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 5.times do
#   User.create(
#     name: Faker::Hobbit.character,
#     email: Faker::Internet.email,
#     password: 'test123'
#   )
# end
5.times do
  new_group = Group.new
  new_group.name = Faker::StarWars.specie
  new_group.save
end
