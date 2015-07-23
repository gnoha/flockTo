class Attending < ActiveRecord::Base
  validates :user_id, :flock_id, presence: true
  validates :user_id, uniqueness: {scope: :flock_id}


  belongs_to :user
  belongs_to :flock
  has_many :events, through: :flock

  validate :unique_event_id

  def self.find_by_pair(current_user_id, flock_id)
    attending = Attending.find_by(user_id: current_user_id, flock_id: flock_id)
    attending.nil? ? nil : attending
  end

  def ensure_one_event
    self.flock.event_id
  end

  def unique_event_id
    current_events = self.user.attended_events.pluck(:id)
    if current_events.include?(self.flock.event_id)
      old_flock = user.attended_flocks.where(event_id: flock.event_id).first
      attending = Attending.find_by_pair(self.user.id, old_flock.id)
      attending.delete

      self.user.attendings.new(flock_id: self.flock)
      # errors.add(:flock_id, 'User is already going to this event!')
    end
  end
end
