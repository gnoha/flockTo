user1 = User.create(username: 'user1', password: 'password')
user2 = User.create(username: 'user2', password: 'password')
user3 = User.create(username: 'user3', password: 'password')
user4 = User.create(username: 'user4', password: 'password')
user5 = User.create(username: 'user5', password: 'password')

flock = Flock.create(title: 'flock1', destination: 'place1', description: 'bleh', date: '2015-07-24', time: '10:00')
flock2 = Flock.create(title: 'flock2', destination: 'place1', description: 'bleh', date: '2015-07-24', time: '12:00')
flock3 = Flock.create(title: 'flock3', destination: 'place1', description: 'bleh', date: '2015-07-24', time: '12:00')

organizing1 = Organizing.create(user_id: 1, flock_id: 1)
organizing2 = Organizing.create(user_id: 2, flock_id: 2)
organizing3 = Organizing.create(user_id: 1, flock_id: 3)
