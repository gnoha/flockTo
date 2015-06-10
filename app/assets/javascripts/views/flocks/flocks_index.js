FlockTo.Views.FlocksIndex = Backbone.View.extend({

  template: JST['flocks/index'],

  tagName: 'ul',

  className: 'flocks-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addFlocksIndexItem);
  },

  render: function () {
    var content = this.template({ flocks: this.collection });
    this.$el.html(content);
    return this;
  },

  addFlocksIndexItems: function () {

  }

});
