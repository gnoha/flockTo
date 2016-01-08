FlockTo.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$el;
    this.$map = options.$map;
    this.$auxEl = options.$auxEl;
    this.$button = options.$button;
    this.events = options.events;
    this.flocks = options.flocks;
    this.users = options.users;
    this.currentTour = undefined;

    if (window.CURRENT_USER_ID) {
      this.currentUser = this.users.getOrFetch(CURRENT_USER_ID, function () {
        this.navbar();
      }.bind(this));
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

  addHelpButton: function (view) {
    this._button && this._button.remove();
    this._button = view;
    this.$button.html(view.$el);
    view.render();
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

        this._swapView(indexView, this.$rootEl);

        this.currentTour = FlockTo.EventIndexTour;
        this.tourActions(this.currentTour);

        if (!FlockTo.Tour.index && this.currentUser.isGuest()) {
          FlockTo.Tour.index = true
        }
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

      this._swapView(showView, this.$rootEl);

      this.currentTour = FlockTo.EventShowTour;
      this.tourActions(this.currentTour);

      if (!FlockTo.Tour.eventShow && this.currentUser.isGuest()) {
        FlockTo.Tour.eventShow = true
      }
    }.bind(this));
  },

  showFlock: function(id) {
    this._mapview && this._mapview.remove();
    var flock = this.flocks.getOrFetch(id, function () {
      var showView = new FlockTo.Views.FlockShow({
        model: flock,
        users: this.users,
        currentUser: this.currentUser
      });
      
      this._swapView(showView, this.$auxEl);

      showView.map.initMap();

      
      this.currentTour = FlockTo.FlockShowTour;
      this.tourActions(this.currentTour);

      if (!FlockTo.Tour.flockShow && this.currentUser.isGuest()) {
        FlockTo.Tour.flockShow = true
      }
    }.bind(this));
  },

  showUser: function(id) {
    this._mapview && this._mapview.remove();
    var user = this.users.getOrFetch(id, function () {
      var showView = new FlockTo.Views.UserShow({
        model: user,
        going: user.going(),
        been: user.been()
      });
  
      this._button && this._button.remove();

      this._swapView(showView, this.$auxEl);
    }.bind(this));
  },

  _swapView: function (view, $el) {
    if (this.currentTour) {
      this.currentTour.end();
      this.currentTour = undefined;
    }
    this._currentView && this._currentView.remove();
    this._currentView = view;
    $el.html(view.$el);
    view.render();
  }, 

  tourActions: function(tour) {
    tour.init();
    tour.setCurrentStep(0);
    tour.start(true);
  }
});
