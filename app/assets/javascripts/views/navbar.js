FlockTo.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  events: {
    'click .submit': 'submit',
    'click .sign-out': 'signout'
  },

  initialize: function () {
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
    var input = $('.event-search').serializeJSON();
    var query = {};
    query['search'] = input;
    debugger
  }
});
