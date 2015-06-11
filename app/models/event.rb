class Event < ActiveRecord::Base
  validates :title, :description, :date, presence: true

  has_many :flocks
end
