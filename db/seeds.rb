# to reset the database
# heroku restart; heroku pg:reset DATABASE --confirm APP-NAME; heroku run rails db:migrate
# heroku run rails db:seed

# Categories
puts "Seeding Categories..."

Category.create(name: "Income")
Category.create(name: "Expense")
Category.create(name: "Budget")
Category.create(name: "Statement")

# Sub-Categories
puts "seeding Sub_Categories..."

# Income
SubCategory.create(name: "Paycheck",        category_id: "1")
SubCategory.create(name: "Side Income",     category_id: "1")
SubCategory.create(name: "Other",           category_id: "1")

# Expense
SubCategory.create(name: "Housing",         category_id: "2")
SubCategory.create(name: "Utilities",       category_id: "2")
SubCategory.create(name: "Internet",        category_id: "2")
SubCategory.create(name: "Insurance",       category_id: "2")
SubCategory.create(name: "Food",            category_id: "2")
# SubCategory.create(name: "Eating Out",      category_id: "2")
# SubCategory.create(name: "Gas",             category_id: "2")
SubCategory.create(name: "Transportation",  category_id: "2")
SubCategory.create(name: "Entertainment",   category_id: "2")
# SubCategory.create(name: "Clothing",        category_id: "2")
SubCategory.create(name: "Self Care",       category_id: "2")
# SubCategory.create(name: "Education",       category_id: "2")
# SubCategory.create(name: "Medical",         category_id: "2")
SubCategory.create(name: "Charity",         category_id: "2")
SubCategory.create(name: "Fees",            category_id: "2")
SubCategory.create(name: "Misc",            category_id: "2")
SubCategory.create(name: "Savings",         category_id: "2")

# Budget
SubCategory.create(name: "Housing",         category_id: "3")
SubCategory.create(name: "Utilities",       category_id: "3")
SubCategory.create(name: "Internet",        category_id: "3")
SubCategory.create(name: "Insurance",       category_id: "3")
SubCategory.create(name: "Food",            category_id: "3")
# SubCategory.create(name: "Eating Out",      category_id: "3")
# SubCategory.create(name: "Gas",             category_id: "3")
SubCategory.create(name: "Transportation",  category_id: "3")
SubCategory.create(name: "Entertainment",   category_id: "3")
# SubCategory.create(name: "Clothing",        category_id: "3")
SubCategory.create(name: "Self Care",       category_id: "3")
# SubCategory.create(name: "Education",       category_id: "3")
# SubCategory.create(name: "Medical",         category_id: "3")
SubCategory.create(name: "Charity",         category_id: "3")
SubCategory.create(name: "Fees",            category_id: "3")
SubCategory.create(name: "Misc",            category_id: "3")
SubCategory.create(name: "Savings",         category_id: "3")

# Statement
SubCategory.create(name: "Net Worth",       category_id: "4")

# users
puts "seeding Users..."

User.create(email: "q@q", password: "q", password_confirmation: "q")

# Jounal Entries
puts "seeding Journal_Entries..."

4.times do
    JournalEntry.create(amount: 1052, note: "", user_id: 1, sub_category_id: 1, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
end
JournalEntry.create(amount: 100,    note: "", user_id: 1, sub_category_id: 2, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 20,     note: "", user_id: 1, sub_category_id: 3, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))


JournalEntry.create(amount: 1435,   note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Housing")         .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 400,    note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Utilities")       .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 60,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Internet")        .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 530,    note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Insurance")       .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 278,    note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Food")            .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
# JournalEntry.create(amount: 28,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Eating Out")      .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-06-25'))
# JournalEntry.create(amount: 68,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Gas")             .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 218,    note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Transportation")  .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 150,    note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Entertainment")   .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
# JournalEntry.create(amount: 30,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Clothing")        .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 70,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name:"Self Care")        .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
# JournalEntry.create(amount: 0,      note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Education")       .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
# JournalEntry.create(amount: 30,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Medical")         .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 20,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Charity")         .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 15,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Fees")            .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 30,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Misc")            .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))
JournalEntry.create(amount: 1000,     note: "", user_id: 1, sub_category_id: SubCategory.find_by(name: "Savings")            .id, date: Faker::Date.between(from: '2022-04-01', to: '2022-04-26'))

JournalEntry.create(amount: 1435,   note: "", user_id: 1, sub_category_id: 16, date: nil)
JournalEntry.create(amount: 400,    note: "", user_id: 1, sub_category_id: 17, date: nil)
JournalEntry.create(amount: 60,     note: "", user_id: 1, sub_category_id: 18, date: nil)
JournalEntry.create(amount: 530,    note: "", user_id: 1, sub_category_id: 19, date: nil)
JournalEntry.create(amount: 278,    note: "", user_id: 1, sub_category_id: 20, date: nil)
# JournalEntry.create(amount: 28,     note: "", user_id: 1, sub_category_id: 25, date: nil)
# JournalEntry.create(amount: 68,     note: "", user_id: 1, sub_category_id: 26, date: nil)
JournalEntry.create(amount: 218,    note: "", user_id: 1, sub_category_id: 21, date: nil)
JournalEntry.create(amount: 150,    note: "", user_id: 1, sub_category_id: 22, date: nil)
# JournalEntry.create(amount: 30,     note: "", user_id: 1, sub_category_id: 29, date: nil)
JournalEntry.create(amount: 70,     note: "", user_id: 1, sub_category_id: 23, date: nil)
# JournalEntry.create(amount: 0,      note: "", user_id: 1, sub_category_id: 31, date: nil)
# JournalEntry.create(amount: 30,     note: "", user_id: 1, sub_category_id: 32, date: nil)
JournalEntry.create(amount: 20,     note: "", user_id: 1, sub_category_id: 24, date: nil)
JournalEntry.create(amount: 15,     note: "", user_id: 1, sub_category_id: 25, date: nil)
JournalEntry.create(amount: 30,     note: "", user_id: 1, sub_category_id: 26, date: nil)
JournalEntry.create(amount: 1000,   note: "", user_id: 1, sub_category_id: 27, date: nil)

20.times do
    JournalEntry.create(amount: rand(1000...2000), note: "", user_id: 1, sub_category_id: 28, date: Faker::Date.between(from: '2020-01-01', to: '2022-05-26'))
end

puts "Done!"
