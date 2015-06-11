class Flock < ActiveRecord::Base
  validates :title, :description, :location, :date, :event_id, presence: true

  has_many(:organizations,
           class_name: 'Organizer',
           foreign_key: :flock_id
          )
  has_many(:organizers,
           through: :organizations,
           source: :organizer
          )
  belongs_to :event
end
