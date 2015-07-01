FlockTo.Collections.Flocks = Backbone.Collection.extend({
  url: '/api/flocks',

  model: FlockTo.Models.Flock,

  getOrFetch: function (id, callback) {
    var collection = this;
    var flock = this.get(id);

    if (flock) {
      flock.fetch({
        success: function () {
          callback();
        }
      });
    } else {
      flock = new FlockTo.Models.Flock({ id: id });
      flock.fetch({
        success: function () {
          collection.add(flock);
          callback();
        }
      });
    }

    return flock;
  }

});
