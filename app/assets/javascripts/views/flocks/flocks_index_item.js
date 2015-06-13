FlockTo.Views.FlocksIndexItem = Backbone.View.extend({
  template: JST['flocks/index_item'],

  className: 'flocks-index-item card',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ flock: this.model });
    this.$el.html(content);
    this.$el.attr('data-id', this.model.get('id'));

    return this;
  }
});
