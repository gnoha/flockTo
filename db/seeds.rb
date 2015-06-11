user1 = User.create(username: 'user1', password: 'password')
user2 = User.create(username: 'user2', password: 'password')
user3 = User.create(username: 'user3', password: 'password')
user4 = User.create(username: 'user4', password: 'password')
user5 = User.create(username: 'user5', password: 'password')

flock = Flock.create(
  title: 'flock1', location: 'place1',
  description: 'bleh', date: '2015-07-02',
  event_id: 1)
flock2 = Flock.create(
  title: 'flock2', location: 'place1',
  description: 'bleh', date: '2015-07-10',
  event_id: 1, parent_id: 1)
flock3 = Flock.create(
  title: 'flock3', location: 'place1',
  description: 'bleh', date: '2015-07-24',
  event_id: 1, parent_id: 1)

organizing1 = Organizing.create(user_id: 1, flock_id: 1)
organizing2 = Organizing.create(user_id: 2, flock_id: 2)
organizing3 = Organizing.create(user_id: 1, flock_id: 3)

event = Event.create(title: 'partayy', date: '2015-08-03',
        description: 'Tiramisu bonbon dessert. Marshmallow tart halvah sugar plum macaroon ice cream sweet roll jelly. Oat cake candy canes oat cake brownie lollipop. Pie dragée biscuit.')
event2 = Event.create(title: 'whoooo', date: '2015-08-02',
        description: 'Halvah dessert chocolate jelly dragée brownie. Brownie macaroon chupa chups cake toffee chupa chups soufflé. Chocolate jelly jujubes gingerbread carrot cake tiramisu soufflé pastry.')
event3 = Event.create(title: 'new partayy', date: '2015-08-15',
        description: 'Tiramisu bonbon dessert. Marshmallow tart halvah sugar plum macaroon ice cream sweet roll jelly. Oat cake candy canes oat cake brownie lollipop. Pie dragée biscuit.')
