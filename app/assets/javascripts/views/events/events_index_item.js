FlockTo.Views.EventsIndexItem = Backbone.View.extend({
  template: JST['events/index_item'],

  className: 'index-item col-xs-12 col-sm-6 col-md-4 col-lg-3',

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
    this.$el.css({'background-color': this.getColor()});
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
