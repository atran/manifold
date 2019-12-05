module V1
  class CollaboratorSerializer < ManifoldSerializer

    include ::V1::Concerns::ManifoldSerializer

    typed_attribute :role, NilClass
    typed_belongs_to :maker
    typed_belongs_to :collaboratable, polymorphic: true

  end
end
