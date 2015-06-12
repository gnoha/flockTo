FlockTo.Views.UsersIndexItem = Backbone.View.extend({
  template: JST['flocks/index_item'],

  tagName: 'li',

  className: 'user-index-item thumbnail',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
});
