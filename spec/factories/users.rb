FactoryGirl.define do
  factory :user do
    username { Faker::Name.first_name }
    password 'password'
    bio { Faker::Lorem.paragraph(2) }
  end
end
