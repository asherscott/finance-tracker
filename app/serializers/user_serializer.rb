class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :sub_categories, :journal_entries
end
