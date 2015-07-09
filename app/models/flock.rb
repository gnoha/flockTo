class Flock < ActiveRecord::Base
  validates :title, :description, :location, :date,
            :event_id, :coordinator_id,
            presence: true

  validate :meets_before_event, on: [:create, :update]
  validate :meets_before_parent_flock, on: [:create, :update]

  attr_accessor :search_distance, :searched_location, :num_attendees

  has_many(:subflocks,
           class_name: 'Flock',
           foreign_key: :parent_id)

  belongs_to(:parent_flock,
             class_name: 'Flock',
             foreign_key: :parent_id)

  geocoded_by :location


  after_validation :geocode, if: :location_changed?
  # after_validation :reverse_geocode, if: :geocode

  belongs_to(:coordinator,
             class_name: 'User',
             foreign_key: :coordinator_id
            )

  belongs_to :event

  has_many(:event_flocks,
            through: :event,
            source: :flocks)

  has_many :attendings

  has_many(:attendees,
           through: :attendings,
           source: :user)

  def meets_before_event
    if (self.date.nil?) || self.date > self.event.date
      errors.add(:date, "Flock cannot meet after event")
    end
  end

  def meets_before_parent_flock
    if (self.parent_id)
      if (self.date.nil?) || self.date > self.parent_flock.date
        errors.add(:date, "The new flock cannot meet up with this flock")
      end
    end
  end

  def path
    return [self] unless self.parent_id
    parent = parent_flock
    nodes = parent_flock.path
    nodes << self
    nodes
  end

  def count_attendees
    sum = subflocks.inject(0) {|sum, flock| sum += flock.attendings.length}
    sum += self.attendees.length
    sum
  end
end
