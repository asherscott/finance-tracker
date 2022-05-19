class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest

  has_many :journal_entries
end
