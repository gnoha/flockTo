FactoryGirl.define do
  factory :flock do
    title { Faker::Company.name }
    description { Faker::Lorem.paragraph }
    event_id { rand(5) }
    date { Faker::Date.forward(100) }
    location { "Los Angeles, CA" }
    coordinator_id { rand(1..15) }
  end
end
