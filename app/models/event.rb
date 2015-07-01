class Event < ActiveRecord::Base
  validates :title, :description, :date,
            :coordinator_id, :location, presence: true

  geocoded_by :location

  after_validation :geocode

  attr_accessor :num_attendees

  has_many :flocks

  has_many(:attendees,
           through: :flocks,
           source: :attendees)

  belongs_to(:coordinator,
             class_name: 'User',
             foreign_key: :coordinator_id)

  def self.search_for(query)
    Event.find_by_sql(["
      SELECT *
      FROM events
      WHERE UPPER(Title) LIKE ?", "%#{query.upcase}%"])
  end
end
