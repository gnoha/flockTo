FlockTo.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$el;
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
    'events/:id/edit': 'editEvent',
    'flocks/:id/edit': 'editFlock'
  },

  navbar: function () {
    var currentUser = this.users.getOrFetch(CURRENT_USER_ID);
    var nav = new FlockTo.Views.Navbar({
      model: currentUser
    });
    $('#navbar').html(nav.render().$el);
  },

  index: function () {
    this.events.fetch();
    var indexView = new FlockTo.Views.EventsIndex({
      collection: this.events
    });
    this._swapView(indexView);
  },

  showEvent: function (id) {
    var eventModel = this.events.getOrFetch(id);
    var showView = new FlockTo.Views.EventShow({
      model: eventModel,
      users: this.users
    });

    this._swapView(showView);
  },

  editEvent: function (id) {
    var eventModel = this.events.getOrFetch(id);
    var formView = new FlockTo.Views.EventForm({
      model: eventModel
    });
    this._swapView(formView);
  },

  showFlock: function(id) {
    var currentUser = this.users.getOrFetch(CURRENT_USER_ID);
    var flock = this.flocks.getOrFetch(id);
    var showView = new FlockTo.Views.FlockShow({
      model: flock
    });
    this._swapView(showView);
  },

  editFlock: function (id) {
    var flock = this.flocks.getOrFetch(id);
    var eventModel = this.events.getOrFetch(flock.get('event_id'));
    var formView = new FlockTo.Views.FlockForm({
      model: flock,
      collection: eventModel
    });

    this._swapView(formView);
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
