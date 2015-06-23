FlockTo.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$el;
    this.$map = options.$map;
    this.events = options.events;
    this.flocks = options.flocks;
    this.users = options.users;
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
    var currentUser = this.users.getOrFetch(CURRENT_USER_ID);
    var nav = new FlockTo.Views.Navbar({
      model: currentUser,
      router: this
    });
    $('#navbar').html(nav.render().$el);
  },

  showEvent: function (id) {
    var eventModel = this.events.getOrFetch(id);
    eventModel.fetch({
      success: function () {
        var showView = new FlockTo.Views.EventShow({
          model: eventModel,
          collection: this.events,
          users: this.users
        });

        this.addMap({
          collection: eventModel.flocks(),
          eventModel: eventModel,
          currentModel: eventModel,
        });

        this._swapView(showView);
      }.bind(this)
    })
  },

  showFlock: function(id) {
    var currentUser = this.users.getOrFetch(CURRENT_USER_ID);
    var flock = this.flocks.getOrFetch(id);
    flock.fetch({
      success: function () {
        var showView = new FlockTo.Views.FlockShow({
          model: flock,
          users: this.users,
          currentUser: currentUser
        });
        this._swapView(showView);

        // this.addMap({
        //   collection: flock.eventFlocks(),
        //   currentModel: flock,
        //   eventModel: flock.eventModel()
        // });
      }.bind(this)
    });
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
