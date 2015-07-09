# Users
40.times do
  begin
    FactoryGirl.create(:user)
  rescue
    retry
  end
end

# # Events
FactoryGirl.create(
  :event,
  location: "Black Rock Desert, Nevada",
  date: Date.new(2015, 8, 30),
  title: "Burning Man 2015",
  description: 'Burning Man is a network of people inspired by the values reflected in the Ten Principles and united in the pursuit of a more creative and connected existence in the world. Throughout the year we work to build Black Rock City, home of the largest annual Burning Man gathering, and nurture the distinctive culture emerging from that experience. The hub of this global network is the 501(c)(3) non-profit Burning Man Project, headquartered in San Francisco, California. \n The mission of the Burning Man organization is to facilitate and extend the culture that has issued from the Burning Man event into the larger world. \n The Burning Man organization will bring experiences to people in grand, awe-inspiring and joyful ways that lift the human spirit, address social problems and inspire a sense of culture, community and personal engagement.',
  coordinator_id: 1,
  url: "http://burningman.org/",
  img_url: "http://farm3.staticflickr.com/2882/9640429861_f3c805e312.jpg"
)

FactoryGirl.create(
  :event,
  location: "Munich, Germany",
  date: Date.new(2015, 9, 19),
  title: "Oktoberfest",
  description: "Oktoberfest is the world's largest funfair held annually in Munich, Bavaria, Germany. It is a 16-day folk festival running from late September to the first weekend in October with more than 6 million people from around the world attending the event every year. Locally, it is often simply called Wiesn, after the colloquial name of the fairgrounds (Theresienwiese) themselves. The Oktoberfest is an important part of Bavarian culture, having been held since 1810. Other cities across the world also hold Oktoberfest celebrations, modeled after the original Munich event.",
  coordinator_id: 2,
  url: "http://www.oktoberfest.de/en/",
  img_url: "http://craftbeeracademy.com/wp-content/uploads/2013/10/oktoberfest-waitress.jpg"
)

FactoryGirl.create(
  :event,
  location: "London, England",
  date: Date.new(2015, 6, 29),
  title: "Wimbledon",
  description: "The Championships, Wimbledon or simply Wimbledon, is the oldest tennis tournament in the world, and is widely considered the most prestigious. It has been held at the All England Club in Wimbledon, London since 1877. It is one of the four Grand Slam tennis tournaments, the others being the Australian Open, the French Open and the US Open. Since the Australian Open shifted to hardcourt in 1988, Wimbledon is the only major still played on grass.",
  coordinator_id: 3,
  url: "http://www.wimbledon.com/index.html",
  img_url: "http://frontrow24.com/wp-content/uploads/2015/06/Wimbledon-20151.jpg"
)

FactoryGirl.create(
  :event,
  location: "Indio, CA",
  date: Date.new(2016, 4, 15),
  title: "Coachella Weekend 1",
  description: "The Coachella Valley Music and Arts Festival (commonly referred to as Coachella or the Coachella Festival) is an annual music and arts festival held at the Empire Polo Club in Indio, California, located in the Inland Empire's Coachella Valley in the Colorado Desert. It was founded by Paul Tollett in 1999 and is organized by Goldenvoice, a subsidiary of AEG Live. The event features many genres of music, including rock, indie, hip hop, and electronic dance music, as well as art installations and sculptures. Across the grounds, several stages continuously host live music. The main stages are: Coachella Stage, Outdoor Theatre, Gobi Tent, Mojave Tent, and the Sahara Tent; a smaller Oasis Dome was used in 2006 and 2011, while a new Yuma stage was introduced in 2013.",
  coordinator_id: 4,
  url: "www.coachella.com",
  img_url: "https://www.lawgives.com/proxy/s3/s3.amazonaws.com/production.lawgives.com/ep/55/1f/551f0c9e777777655d240100.jpeg"
)

FactoryGirl.create(
  :event,
  location: "Rio de Janeiro, Brazil",
  date: Date.new(2016, 8, 5),
  title: "Summer Olympics 2016",
  description: "The 2016 Summer Olympics, officially known as the Games of the XXXI Olympiad, are the thirty-first Summer Olympic Games, the world's largest international multi-sport event that is held every four years. The 2016 Summer Olympics are commonly known as Rio 2016, as this competition will be held in Rio de Janeiro, Brazil.",
  coordinator_id: 5,
  url: "http://www.olympic.org/",
  img_url: "http://www.logobird.com/wp-content/uploads/2011/01/rio-2016-olympics-logo.jpg"
)

FactoryGirl.create(
  :event,
  location: "Kailua-Kona, HI",
  date: Date.new(2015, 8, 12),
  title: "IRONMAN World Championships",
  description: "The inaugural \"Hawaiian IRON MAN Triathlon\" was conceptualized in 1977 as a way to challenge athletes who had seen success at endurance swim, running and biathlon events. Honolulu-based Navy couple Judy and John Collins proposed combining the three toughest endurance races in Hawai’i—the 2.4-mile Waikiki Roughwater Swim, 112 miles of the Around-O’ahu Bike Race and the 26.2-mile Honolulu Marathon—into one event.",
  coordinator_id: 6,
  url: "http://www.ironman.com/triathlon/events/americas/ironman/world-championship.aspx#axzz3fMrdJZxx",
  img_url: "http://cdn.triathlon.competitor.com/files/2012/10/Kona12-0130.jpg"
)



#
# FactoryGirl.create(
#   :event,
#   location: "Austin, TX",
#   date: Date.new(2015, 11, 11),
#   title: "Winter Migration 2015",
#   description: "Let's escape the cold and settle in one of the southern-most states in the United States. The water won't be frozen and the sun will be out!",
#   coordinator_id: 4
# )
#
# #1
# FactoryGirl.create(
#   :flock,
#   location: "Edmonton, Alberta, Canada",
#   date: Date.new(2015, 11, 03),
#   title: "Alberta Territory Flock",
#   description: "Fellow geese of the Alberta Territory, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 4,
#   event_id: 1
# )
#
# #2
# FactoryGirl.create(
#   :flock,
#   location: "Prince George, Columbia, Canada",
#   date: Date.new(2015, 11, 01),
#   title: "Columbia Territory Flock",
#   description: "Fellow geese of the Columbia Territory, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 2,
#   event_id: 1,
#   parent_id: 1
# )
#
# #3
# FactoryGirl.create(
#   :flock,
#   location: "Whitehorse, Yukon, Canada",
#   date: Date.new(2015, 11, 01),
#   title: "Yukon Territory Flock",
#   description: "Fellow geese of the Yukon, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 2,
#   event_id: 1,
#   parent_id: 1
# )
#
# #4
# FactoryGirl.create(
#   :flock,
#   location: "Yellowknife, Northwest, Canada",
#   date: Date.new(2015, 11, 02),
#   title: "Northwest Territory Flock",
#   description: "Fellow geese of the Northwest, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 3,
#   event_id: 1,
#   parent_id: 1
# )
#
# #5
# FactoryGirl.create(
#   :flock,
#   location: "Saskatoon, Saskatchewan, Canada",
#   date: Date.new(2015, 11, 01),
#   title: "Saskatchewan Territory Flock",
#   description: "Fellow geese of the Saskatchewan Territory, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 5,
#   event_id: 1,
#   parent_id: 1
# )
#
# sleep(4)
# #6
# FactoryGirl.create(
#   :flock,
#   location: "Ottawa, Canada",
#   date: Date.new(2015, 11, 04),
#   title: "Leaving from Ottawa",
#   description: "Fellow geese of Eastern Canada, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 6,
#   event_id: 1
# )
#
# #7
# FactoryGirl.create(
#   :flock,
#   location: "Chibougamau, Quebec, Canada",
#   date: Date.new(2015, 11, 02),
#   title: "Let's Go Quebec!",
#   description: "Fellow geese of Quebec, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 7,
#   event_id: 1,
#   parent_id: 6
# )
#
# #8
# FactoryGirl.create(
#   :flock,
#   location: "Sudbury, Ontario, Canada",
#   date: Date.new(2015, 11, 03),
#   title: "Onwards to Texas!",
#   description: "Fellow geese of Ontario, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 8,
#   event_id: 1,
#   parent_id: 6
# )
#
# #9
# FactoryGirl.create(
#   :flock,
#   location: "Fredericton, New Brunswick, Canada",
#   date: Date.new(2015, 11, 02),
#   title: "East to South",
#   description: "Fellow geese of New Brunswick, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 9,
#   event_id: 1,
#   parent_id: 6
# )
# sleep(4)
#
# #10
# FactoryGirl.create(
#   :flock,
#   location: "Goose Bay, Newfoundland, Canada",
#   date: Date.new(2015, 10, 30),
#   title: "South for the winter",
#   description: "Fellow geese of Newfoundland, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 10,
#   event_id: 1,
#   parent_id: 7
# )
#
# #11
# FactoryGirl.create(
#   :flock,
#   location: "Halifax, Nova Scotia",
#   date: Date.new(2015, 11, 01),
#   title: "Nova Scotia to Texas",
#   description: "Fellow geese of Nova Scotia, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 11,
#   event_id: 1,
#   parent_id: 6
# )
#
# #12
# FactoryGirl.create(
#   :flock,
#   location: "Winnipeg, Manitoba, Canada",
#   date: Date.new(2015, 10, 30),
#   title: "Onwards to Texas",
#   description: "Fellow geese of Manitoba, let's go to Texas for the winter! I hear the water is great.",
#   coordinator_id: 12,
#   event_id: 1,
#   parent_id: 5
# )
#
# # Attendings
# user_ids = User.pluck(:id)
# flock_ids = Flock.pluck(:id)
#
# 40.times do
#   begin
#     u = user_ids.sample
#     f = flock_ids.sample
#     FactoryGirl.create(:attending, user_id: u, flock_id: f)
#   rescue
#     retry
#   end
# end
