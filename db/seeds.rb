# Users
40.times do
  begin
    FactoryGirl.create(:user)
  rescue
    retry
  end
end

# # Events
# ["Austin, TX", "Santa Fe, NM"].each do |city|
#   FactoryGirl.create(
#     :event,
#     location: city,
#     date: Faker::Date.between(Date.new(2015, 11, 05), Date.new(2015, 11, 21)),
#     )
# end

FactoryGirl.create(
  :event,
  location: "Austin, TX",
  date: Date.new(2015, 11, 11),
  title: "Winter Migration 2015",
  description: "Let's escape the cold and settle in one of the southern-most states in the United States. The water won't be frozen and the sun will be out!",
  coordinator_id: 1
)

#1
FactoryGirl.create(
  :flock,
  location: "Edmonton, Alberta, Canada",
  date: Date.new(2015, 11, 03),
  title: "Alberta Territory Flock",
  description: "Fellow geese of the Alberta Territory, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 4,
  event_id: 1
)

#2
FactoryGirl.create(
  :flock,
  location: "Prince George, Columbia, Canada",
  date: Date.new(2015, 11, 01),
  title: "Columbia Territory Flock",
  description: "Fellow geese of the Columbia Territory, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 2,
  event_id: 1,
  parent_id: 1
)

#3
FactoryGirl.create(
  :flock,
  location: "Whitehorse, Yukon, Canada",
  date: Date.new(2015, 11, 01),
  title: "Yukon Territory Flock",
  description: "Fellow geese of the Yukon, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 2,
  event_id: 1,
  parent_id: 1
)

#4
FactoryGirl.create(
  :flock,
  location: "Yellowknife, Northwest, Canada",
  date: Date.new(2015, 11, 02),
  title: "Northwest Territory Flock",
  description: "Fellow geese of the Northwest, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 3,
  event_id: 1,
  parent_id: 1
)

#5
FactoryGirl.create(
  :flock,
  location: "Saskatoon, Saskatchewan, Canada",
  date: Date.new(2015, 11, 01),
  title: "Saskatchewan Territory Flock",
  description: "Fellow geese of the Saskatchewan Territory, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 5,
  event_id: 1,
  parent_id: 1
)

sleep(4)
#6
FactoryGirl.create(
  :flock,
  location: "Ottawa, Canada",
  date: Date.new(2015, 11, 04),
  title: "Leaving from Ottawa",
  description: "Fellow geese of Eastern Canada, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 6,
  event_id: 1
)

#7
FactoryGirl.create(
  :flock,
  location: "Chibougamau, Quebec, Canada",
  date: Date.new(2015, 11, 02),
  title: "Let's Go Quebec!",
  description: "Fellow geese of Quebec, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 7,
  event_id: 1,
  parent_id: 6
)

#8
FactoryGirl.create(
  :flock,
  location: "Sudbury, Ontario, Canada",
  date: Date.new(2015, 11, 03),
  title: "Onwards to Texas!",
  description: "Fellow geese of Ontario, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 8,
  event_id: 1,
  parent_id: 6
)

#9
FactoryGirl.create(
  :flock,
  location: "Fredericton, New Brunswick, Canada",
  date: Date.new(2015, 11, 02),
  title: "East to South",
  description: "Fellow geese of New Brunswick, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 9,
  event_id: 1,
  parent_id: 6
)
sleep(4)

#10
FactoryGirl.create(
  :flock,
  location: "Goose Bay, Newfoundland, Canada",
  date: Date.new(2015, 10, 30),
  title: "South for the winter",
  description: "Fellow geese of Newfoundland, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 10,
  event_id: 1,
  parent_id: 7
)

#11
FactoryGirl.create(
  :flock,
  location: "Halifax, Nova Scotia",
  date: Date.new(2015, 11, 01),
  title: "Nova Scotia to Texas",
  description: "Fellow geese of Nova Scotia, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 11,
  event_id: 1,
  parent_id: 6
)

#12
FactoryGirl.create(
  :flock,
  location: "Winnipeg, Manitoba, Canada",
  date: Date.new(2015, 10, 30),
  title: "Onwards to Texas",
  description: "Fellow geese of Manitoba, let's go to Texas for the winter! I hear the water is great.",
  coordinator_id: 12,
  event_id: 1,
  parent_id: 5
)

# Attendings
user_ids = User.pluck(:id)
flock_ids = Flock.pluck(:id)

40.times do
  begin
    u = user_ids.sample
    f = flock_ids.sample
    FactoryGirl.create(:attending, user_id: u, flock_id: f)
  rescue
    retry
  end
end
