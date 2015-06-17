FlockTo.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  events: {
    'click .submit': 'submit',
    'click .sign-out': 'signout'
  },

  initialize: function (options) {
    this.router = options.router,
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    var content = this.template({
      current_user: this.model
    });
    this.$el.html(content);

    return this;
  },

  signout: function (e) {
    e.preventDefault();
    $.ajax({
      url: 'session',
      type: 'DELETE',
      success: function () {
        window.location.replace('/session/new');
      }
    });
  },

  submit: function (e) {
    e.preventDefault();
    var searchedEvents = new FlockTo.Collections.Events();
    var input = $('.event-search').serializeJSON();
    searchedEvents.fetch({
      data: input,
      reset: true,
      success: function (response) {
        debugger
        var view = new FlockTo.Views.EventsIndex({
          collection: response
        });
        this.router._swapView(view);
      }.bind(this)
    });
  }
});
