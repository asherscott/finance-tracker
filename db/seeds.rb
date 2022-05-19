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
SubCategory.create(name: "Hobby Income", category_id: "1")
SubCategory.create(name: "Gambling", category_id: "1")
SubCategory.create(name: "Gifts", category_id: "1")
SubCategory.create(name: "Other", category_id: "1")

# Expense
SubCategory.create(name: "Housing", category_id: "2")
SubCategory.create(name: "Utilities", category_id: "2")
SubCategory.create(name: "Internet", category_id: "2")
SubCategory.create(name: "Insurance", category_id: "2")
SubCategory.create(name: "Food", category_id: "2")
SubCategory.create(name: "Eating Out", category_id: "2")
SubCategory.create(name: "Gas", category_id: "2")
SubCategory.create(name: "Transportation", category_id: "2")
SubCategory.create(name: "Entertainment", category_id: "2")
SubCategory.create(name: "Clothing", category_id: "2")
SubCategory.create(name: "Self Care", category_id: "2")
SubCategory.create(name: "Education", category_id: "2")
SubCategory.create(name: "Medical", category_id: "2")
SubCategory.create(name: "Charity", category_id: "2")
SubCategory.create(name: "Fees", category_id: "2")
SubCategory.create(name: "Misc", category_id: "2")

# Budget
SubCategory.create(name: "Housing", category_id: "3")
SubCategory.create(name: "Utilities", category_id: "3")
SubCategory.create(name: "Internet", category_id: "3")
SubCategory.create(name: "Insurance", category_id: "3")
SubCategory.create(name: "Food", category_id: "3")
SubCategory.create(name: "Eating Out", category_id: "3")
SubCategory.create(name: "Gas", category_id: "3")
SubCategory.create(name: "Transportation", category_id: "3")
SubCategory.create(name: "Entertainment", category_id: "3")
SubCategory.create(name: "Clothing", category_id: "3")
SubCategory.create(name: "Self Care", category_id: "3")
SubCategory.create(name: "Education", category_id: "3")
SubCategory.create(name: "Medical", category_id: "3")
SubCategory.create(name: "Charity", category_id: "3")
SubCategory.create(name: "Fees", category_id: "3")
SubCategory.create(name: "Misc", category_id: "3")

# Statement
SubCategory.create(name: "Checking", category_id: "4")
SubCategory.create(name: "Investment", category_id: "4")
SubCategory.create(name: "Savings", category_id: "4")
SubCategory.create(name: "401(k)", category_id: "4")
SubCategory.create(name: "Debt", category_id: "4")
SubCategory.create(name: "IRA", category_id: "4")

# users
puts "seeding Users..."

User.create(email: "tim@admin", password: "admin", password_confirmation: "admin")
User.create(email: "q@q", password: "q", password_confirmation: "q")

# Jounal Entries
puts "seeding Journal_Entries..."

20.times do
    JournalEntry.create(amount: rand(1..30), note: "test", user_id: rand(1..2), sub_category_id: rand(1..12))
end

puts "Done!"
