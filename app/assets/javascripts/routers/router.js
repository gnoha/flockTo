FlockTo.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$el;
    this.flocks = options.flocks;
  },

  routes: {
    '': 'index',
    'flocks/:id': 'show'
  },

  index: function () {
    this.flocks.fetch();
    var indexView = new FlockTo.Views.FlocksIndex({
      collection: this.flocks
    });

    this._swapView(indexView);
  },

  show: function (id) {
    var flock = this.flocks.getOrFetch(id);
    var showView = new FlockTo.Views.FlockShow({
      model: flock
    });

    this._swapView(showView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
