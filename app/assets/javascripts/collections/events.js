FlockTo.Collections.Events = Backbone.Collection.extend({
  url: 'api/events',

  model: FlockTo.Models.Event,

  comparator: function (model) {
    var dateString = model.get('date');
    var date = new Date(dateString);
    return date.getTime();
  },

  getOrFetch: function (id) {
    var collection = this;
    var model = this.get(id);

    if (model) {
      model.fetch();
    } else {
      model = new FlockTo.Models.Event({ id: id });
      model.fetch({
        success: function () {
          collection.add(model);
        }
      });
    }

    return model
  }
});
