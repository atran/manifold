# Provides a partial serialization of a maker model.
class MakerSerializer < ActiveModel::Serializer
  include Authorization
  meta(partial: false)

  attributes :id, :first_name, :last_name, :middle_name, :display_name, :avatar_url,
             :full_name

  has_many :users, if: :can_update_object?
end
