FactoryGirl.define do
  user_ids = User.pluck(:id)
  flock_ids = Flock.pluck(:id)

  factory :attending do
    user_id { user_ids.sample }
    flock_id { flock_ids.sample }
  end
end
