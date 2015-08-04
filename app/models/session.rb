class Session < ActiveRecord::Base
  validates :user_id, :session_token, presence: true
  validates :session_token, uniqueness: true
  # validates_uniqueness_of :user_id, :scope => [:session_token]

  belongs_to :user

  after_initialize :set_token
  
  def set_token
    self.session_token = SecureRandom.urlsafe_base64
  end
end
