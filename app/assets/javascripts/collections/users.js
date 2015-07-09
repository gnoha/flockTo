FlockTo.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',

  model: FlockTo.Models.User,

  getOrFetch: function (id, callback) {
    var collection = this;
    var user = collection.get(id);

    if (user) {
      user.fetch({
        success: function () {
          callback();
        }
      });
    } else {
      user = new FlockTo.Models.User({ id: id });
      user.fetch({
        success: function () {
          collection.add(user);
          callback();
        }
      });
    }

    return user;
  }
});
