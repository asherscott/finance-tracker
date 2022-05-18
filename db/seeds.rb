# Categories
puts "Seeding Categories..."

Category.create(name: "Income")
Category.create(name: "Expense")
Category.create(name: "Budget")
Category.create(name: "Statement")

# Sub-Categories
puts "seeding Sub_Categories..."

# Income
SubCategory.create(name: "Paycheck", category_id: "1")
SubCategory.create(name: "Side-Hustle", category_id: "1")

# Expense
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

10.times do
    JournalEntry.create(amount: rand(1..30), note: "test", user_id: 1, sub_category_id: rand(1..12))
end

puts "Done!"
