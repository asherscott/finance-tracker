class JournalEntrySerializer < ActiveModel::Serializer
  attributes :id, :amount, :note
  has_one :user
  has_one :sub_category
end
