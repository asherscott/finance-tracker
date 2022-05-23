class JournalEntrySerializer < ActiveModel::Serializer
  attributes :id, :amount, :note, :sub_category, :category, :date
  # has_one :user
  has_one :sub_category
end
