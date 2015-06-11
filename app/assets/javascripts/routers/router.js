FlockTo.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$el;
    this.collection = options.collection;
  },

  routes: {
    '': 'index',
    'events/:id': 'showEvent',
    'flocks/:id': 'showFlock'
  },

  index: function () {
    this.collection.fetch();
    var indexView = new FlockTo.Views.EventsIndex({
      collection: this.collection
    });
    this._swapView(indexView);
  },

  showEvent: function (id) {
    var eventModel = this.collection.getOrFetch(id);
    var showView = new FlockTo.Views.EventShow({
      model: eventModel
    });

    this._swapView(showView);
  },

  showFlock: function(id) {
    var flocks = new FlockTo.Collections.Flocks();
    var flock = flocks.getOrFetch(id);
    var showView = new FlockTo.Views.FlockShow({ model: flock });
    this._swapView(showView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
