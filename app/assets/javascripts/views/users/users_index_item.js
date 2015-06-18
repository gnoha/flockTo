FlockTo.Views.UsersIndexItem = Backbone.View.extend({
  template: JST['users/index_item'],

  className: 'user-index-item thumbnail col-xs-4 col-md-2',

  events: {
    'click': 'navToUser',
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.attr('data-id', this.model.get('id'));
    this.$el.html(content);

    return this;
  },

  navToUser: function (event) {
    var userId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/users/' + userId, {trigger: true});
  }
});
