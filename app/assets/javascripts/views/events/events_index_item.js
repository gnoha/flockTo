FlockTo.Views.EventsIndexItem = Backbone.View.extend({
  template: JST['events/index_item'],

  className: 'index-item-wrapper col-xs-12',

  events: {
    'click': 'navToEvent'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  navToEvent: function (event) {
    event.preventDefault();
    var eventId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/events/'+eventId, { trigger: true });
  },

  render: function () {
    var content = this.template({ eventModel: this.model });
    this.$el.attr('data-id', this.model.get('id'));
    this.$el.html(content);
    if (this.model.get('img_url')){
      this.$el.children('.index-item').css({
        'background-image': 'url(' + this.model.get('img_url') + ')',
        'background-size': 'cover'});
      }
    return this;
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
