FactoryGirl.define do
  factory :flock do
    title { Faker::Company.name }
    description { Faker::Lorem.paragraph }
  end
end
