class Attending < ActiveRecord::Base
  validates :user_id, :flock_id, presence: true
  validates :user_id, uniqueness: {scope: :flock_id}

  belongs_to :user
  belongs_to :flock

  def self.find_by_pair (current_user_id, flock_id)
    attending = Attending.find_by(user_id: current_user_id, flock_id: flock_id)
    attending.nil? ? nil : attending
  end

end
