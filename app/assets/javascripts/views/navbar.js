FlockTo.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    var content = this.template({
      current_user: this.model
    });
    this.$el.html(content);

    return this;
  }
});
