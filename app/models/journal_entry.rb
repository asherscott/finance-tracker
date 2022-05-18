class JournalEntry < ApplicationRecord
  belongs_to :user
  belongs_to :sub_category

  def category
    self.sub_category.category
  end
end
