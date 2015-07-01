FlockTo.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$el;
    this.$map = options.$map;
    this.events = options.events;
    this.flocks = options.flocks;
    this.users = options.users;
    this.currentUser = this.users.getOrFetch(CURRENT_USER_ID);
    if (window.CURRENT_USER_ID) {
      this.navbar();
    }
  },

  routes: {
    '': 'index',
    'events/:id': 'showEvent',
    'flocks/:id': 'showFlock',
    'users/:id' : 'showUser',
  },

  addMap: function (options) {
    var map = new FlockTo.Views.MapShow({
      collection: options.collection,
      currentModel: options.currentModel,
      eventModel: options.eventModel,
      isIndex: options.index
    });

    this._mapview && this._mapview.remove();
    this._mapview = map;
    this.$map.html(map.$el);
    map.initMap();
  },


  index: function () {
    this.events.fetch({
      success: function () {
        var indexView = new FlockTo.Views.EventsIndex({
          collection: this.events,
          router: this
        });

        this.addMap({
          collection: this.events,
          index: true
        });

        this._swapView(indexView);
      }.bind(this)
    });
  },

  navbar: function () {
    var nav = new FlockTo.Views.Navbar({
      model: this.currentUser,
      router: this
    });
    $('#navbar').html(nav.render().$el);
  },

  showEvent: function (id) {
    var eventModel = this.events.getOrFetch(id, function () {
      var showView = new FlockTo.Views.EventShow({
        model: eventModel,
        collection: this.events,
        users: this.users,
        isIndex: true
      });

      this.addMap({
        collection: eventModel.flocks(),
        eventModel: eventModel,
        currentModel: eventModel,
      });

      this._swapView(showView);
    }.bind(this));
  },

  showFlock: function(id) {
    this._mapview && this._mapview.remove();
    // var currentUser = this.users.getOrFetch(CURRENT_USER_ID);
    var flock = this.flocks.getOrFetch(id, function () {
      var showView = new FlockTo.Views.FlockShow({
        model: flock,
        users: this.users,
        currentUser: this.currentUser
      });
      this._swapView(showView);
    }.bind(this));
  },

  showUser: function(id) {
    var user = this.users.getOrFetch(id);
    var showView = new FlockTo.Views.UserShow({ model: user });
    this._swapView(showView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
