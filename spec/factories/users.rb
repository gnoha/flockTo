FactoryGirl.define do
  factory :user do
    username { Faker::Lorem.word }
    password 'password'
    bio { Faker::Lorem.paragraph(2) }
  end
end
