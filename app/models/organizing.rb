class Organizing < ActiveRecord::Base
  belongs_to :flock
  belongs_to :organizer, class_name: 'User', foreign_key: :user_id
end
