FlockTo.Collections.Flocks = Backbone.Collection.extend({
  url: '/api/flocks',

  model: FlockTo.Models.Flock,

  getOrFetch: function (id) {
    var collection = this;
    var flock = this.get(id);

    if (flock) {
      flock.fetch();
    } else {
      flock = new FlockTo.Models.Flock({ id: id });
      flock.fetch({
        success: function () {
          collection.add(flock);
        }
      });
    }

    return flock;
  }

});
