class Flock < ActiveRecord::Base
  validates :title, :description, :location, :date,
            :event_id, :coordinator_id,
            presence: true

  attr_accessor :search_distance, :searched_location

  has_many(:subflocks,
            class_name: 'Flock',
            foreign_key: :parent_id)

  geocoded_by :location

  after_validation :geocode

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
