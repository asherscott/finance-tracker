# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Categories
puts "Seeding Categories..."

Category.create(name: "Credit")
Category.create(name: "Debit")
Category.create(name: "Budget")
Category.create(name: "Statement")

# Sub-Categories
puts "seeding Sub_Categories..."

# Credit
SubCategory.create(name: "Paycheck", category_id: "1")
SubCategory.create(name: "Side-Hustle", category_id: "1")

# Debit
SubCategory.create(name: "Rent", category_id: "2")
SubCategory.create(name: "Gas", category_id: "2")

# Budget
SubCategory.create(name: "Rent", category_id: "3")
SubCategory.create(name: "Gas", category_id: "3")

# Statement
SubCategory.create(name: "Checking", category_id: "4")
SubCategory.create(name: "Investment", category_id: "4")
SubCategory.create(name: "Savings", category_id: "4")
SubCategory.create(name: "401(k)", category_id: "4")
SubCategory.create(name: "Debt", category_id: "4")
SubCategory.create(name: "IRA", category_id: "4")

# users
puts "seeding Users..."

User.create(email: "tim@gmail.com", password: "qwerty", password_confirmation: "qwerty")

# Jounal Entries
puts "seeding Journal_Entries..."

JournalEntry.create(amount: 5, note: "test rent credit", user_id: 1, sub_category_id: 2)

puts "Done!"
