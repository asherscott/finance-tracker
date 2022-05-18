class SubCategory < ApplicationRecord
  belongs_to :category
  has_many :journal_entries
end
