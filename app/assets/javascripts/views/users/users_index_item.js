FlockTo.Views.UsersIndexItem = Backbone.View.extend({
  template: JST['users/index_item'],

  className: 'user-index-item thumbnail-wrapper col-xs-4 col-md-2',

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
    this.$el.css({'background-color': this.getColor()});
    return this;
  },

  navToUser: function (event) {
    var userId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/users/' + userId, {trigger: true});
  },

  getColor: function () {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
});
