# Users
%w(Wes Anderson Blue Bottle slow-carb put a bird on it gentrify chia art party butcher).each do |name|
  FactoryGirl.create(:user, username: name)
end

# Events
["San Francisco, CA", "New York, NY", "Tokyo, Japan",
 "Dubai, United Arab Emirites"].each do |city|
  FactoryGirl.create(
    :event,
    location: city,
    date: Faker::Date.between(Date.new(2016, 01, 01), Date.new(2016, 03, 01)))
end

# Flocks
sleep(4)
i = 1
["Madrid, Spain", "Ho Chi Minh City, Vietnam", "Casablanca, Morocco",
 "Singapore, Singapore"].each do |city|
  FactoryGirl.create(
    :flock,
    location: city,
    event_id: i,
    date: Faker::Date.between(Date.new(2015, 10, 01), Date.new(2015, 12, 30)))
  i += 1
end

sleep(4)
k = 1
j = 1
["Mexico City, Mexico", "Guangzhou, China", "Durban, South Africa"].each do |city|
  FactoryGirl.create(
    :flock,
    location: city,
    parent_id: j,
    event_id: k,
    date: Faker::Date.between(Date.new(2015, 8, 01), Date.new(2015, 9, 30)))
  k += 1
  j += 1
end

sleep(4)
l = 1
["Bogota, Columbia", "Paris, France",
 "Berlin, Germany", "Melbourne, Australia"].each do |city|
  FactoryGirl.create(
    :flock,
    location: city,
    event_id: l,
    date: Faker::Date.between(Time.zone.today, Date.new(2015, 07, 30)))
  l += 1
end

sleep(4)
m = 1
n = 1
["Lima, Peru", "Instanbul, Turkey", "London, United Kingdom",
 "Saint Petersberg, Russia"].each do |city|
 FactoryGirl.create(
   :flock,
   location: city,
   event_id: m,
   parent_id: n,
   date: Faker::Date.between(Time.zone.today, Date.new(2015, 07, 30)))
  m += 1
  n += 1
end

# Attendings
user_ids = User.pluck(:id)
flock_ids = Flock.pluck(:id)

25.times do
  begin
    u = user_ids.sample
    f = flock_ids.sample
    FactoryGirl.create(:attending, user_id: u, flock_id: f)
  rescue
    retry
  end
end
