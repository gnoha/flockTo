FlockTo.Views.EventsIndexItem = Backbone.View.extend({
  template: JST['events/index_item'],

  tagName: 'li',

  className: 'events-index-item card',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ eventModel: this.model });
    this.$el.attr('data-id', this.model.get('id'));
    this.$el.html(content);

    return this;
  }
});