FlockTo.Models.Users = Backbone.Model.extend({
  urlRoot: '/api/users',

  getOrFetch: function (id) {
    var collection = this;
    var user = collection.get(id);

    if (user) {
    user.fetch();
    } else {
    user = new FlockTo.Models.User({ id: id });
    user.fetch({
      success: function () {
        collection.add(user);
      }
    });
    }

    return user;
  }
});
