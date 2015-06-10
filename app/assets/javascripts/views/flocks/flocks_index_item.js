FlockTo.Views.FlocksIndexItem = Backbone.View.extend({
  template: JST['flocks/index_item'],

  tagName: 'li',

  className: 'flocks-index-item',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ flock: this.model });
    this.$el.html(content);

    return this;
  }
});
