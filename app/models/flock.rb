class Flock < ActiveRecord::Base
  validates :title, :description, :location, :date,
            :event_id, :coordinator_id,
            presence: true

  has_many(:subflocks,
            class_name: 'Flock',
            foreign_key: :parent_id)

  geocoded_by :location

  after_validation :geocode
  # has_many(:organizations,
  #          class_name: 'Organizer',
  #          foreign_key: :flock_id
  #         )
  # has_many(:organizers,
  #          through: :organizations,
  #          source: :organizer
  #         )

  belongs_to(:coordinator,
           class_name: 'User',
           foreign_key: :coordinator_id
           )

  belongs_to :event

  has_many :attendings
  has_many(:attendees,
           through: :attendings,
           source: :user)
end
