FlockTo.Views.EventsIndexItem = Backbone.View.extend({
  template: JST['events/index_item'],

  className: 'events-index-item col-xs-4',

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
