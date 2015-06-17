user1 = User.create(username: 'user1', password: 'password')
user2 = User.create(username: 'user2', password: 'password')
user3 = User.create(username: 'user3', password: 'password')
user4 = User.create(username: 'user4', password: 'password')
user5 = User.create(username: 'user5', password: 'password')

Attending.create(user_id: 1, flock_id: 1)
Attending.create(user_id: 2, flock_id: 2)
Attending.create(user_id: 3, flock_id: 1)
Attending.create(user_id: 4, flock_id: 2)
Attending.create(user_id: 5, flock_id: 2)

event = Event.new(
  title: 'Event 1', date: '2015-08-03', coordinator_id: 1,
  location: 'Los Angeles, CA',
  description: 'Tiramisu bonbon dessert. Marshmallow tart halvah sugar plum macaroon ice cream sweet roll jelly. Oat cake candy canes oat cake brownie lollipop. Pie dragée biscuit.')
event2 = Event.new(
  title: 'Event 2', date: '2015-08-02', coordinator_id: 5,
  location: 'San Francisco, CA',
  description: 'Halvah dessert chocolate jelly dragée brownie. Brownie macaroon chupa chups cake toffee chupa chups soufflé. Chocolate jelly jujubes gingerbread carrot cake tiramisu soufflé pastry.')
event3 = Event.new(
  title: 'Event 3', date: '2015-08-15', coordinator_id: 3,
  location: 'Eureka, CA',
  description: 'Tiramisu bonbon dessert. Marshmallow tart halvah sugar plum macaroon ice cream sweet roll jelly. Oat cake candy canes oat cake brownie lollipop. Pie dragée biscuit.')

[event, event2, event3].each do |e|
  e.geocode
  e.save!
end

flock = Flock.new(
  title: 'flock1', location: 'San Francisco, CA', description: 'I am going to event 1',
  date: '2015-07-22', event_id: 1, coordinator_id: 1)
flock2 = Flock.new(
  title: 'flock2', location: 'Davis, CA',  description: 'I am going to place 2 to go to event 1',
  date: '2015-07-10', event_id: 1, parent_id: 1, coordinator_id: 2)


# flock3 = Flock.create(
#   title: 'flock3', location: 'place3',
#   description: 'I am going to place 1 to go to event 1',
#   date: '2015-07-24',
#   event_id: 1, parent_id: 1, coordinator_id: 3)
#
# flock4 = Flock.create(
#   title: 'flock4', location: 'place4',
#   description: 'I am going to event 1', date: '2015-07-02',
#   event_id: 1, coordinator_id: 4)
# flock5 = Flock.create(
#   title: 'flock5', location: '',
#   description: 'I am going to event 2', date: '2015-07-10',
#   event_id: 2, coordinator_id: 5)
# flock6 = Flock.create(
#   title: 'flock6', location: 'place6',
#   description: 'I am going to place 5 to go to event 3',
#   date: '2015-07-24',
#   event_id: 3, coordinator_id: 3)


[flock, flock2].each do |f|
  f.geocode
  f.save!
end
