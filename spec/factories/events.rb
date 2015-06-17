FactoryGirl.define do
  factory :event do
    title { Faker::Company.catch_phrase }
    description { Faker::Lorem.paragraph }
    date { Faker::Date.forward(100) }
    coordinator_id { rand(15) }
    location "San Francisco, CA"
  end
end
