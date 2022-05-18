class SubCategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :category
end
