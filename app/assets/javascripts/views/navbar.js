FlockTo.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  events: {
    'submit form.event-search': 'submit',
    'click .sign-out': 'signout',
    'click .open-nav-search': 'openModal'
  },

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      currentUser: this.model
    });
    this.$el.html(content);

    return this;
  },

  openModal: function (e) {
    $('#nav-search').modal();
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
        $('#nav-search').modal('toggle');
        var view = new FlockTo.Views.EventsIndex({
          collection: response,
          router: this.router
        });
        this.router.addMap({
          collection: response,
          index: true
        });

        var tourButton = new FlockTo.Views.EventIndexTour();
        this.router.addHelpButton(tourButton);
        
        this.router._swapView(view, this.router.$rootEl);
      }.bind(this)
    });
  }
});
