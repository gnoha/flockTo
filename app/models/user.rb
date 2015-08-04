class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token

  attr_reader :password
  
  attr_accessor :been, :going

  geocoded_by :location

  has_many :sessions

  has_many(:coordinated_events,
           class_name: 'Event',
           foreign_key: :coordinator_id
           )

  has_many(:coordinated_flocks,
           class_name: 'Flock',
           foreign_key: :coordinator_id
           )

  has_many :attendings

  has_many(:attended_flocks,
           through: :attendings,
           source: :flock)

  has_many(:attended_events,
           through: :attended_flocks,
           source: :event)


  def events
    @been = attended_events.select{|event| event.date < Time.now}
    @going = attended_events.select{|event| event.date >= Time.now}
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    return nil if password.nil?
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def add_token!
    session = self.session_token.new 
    session.save!
    session.session_token
  end

  private

  def ensure_session_token
    sessions = self.sessions
    if sessions.length == 0
      new_session = self.sessions.new
      new_session.save
      
    end

    # self.sessions.length > 0 || self.sessions.new
    # self.sessions.length > 0 ||= SecureRandom.urlsafe_base64
  end
end
