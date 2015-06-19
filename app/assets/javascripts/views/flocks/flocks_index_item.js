FlockTo.Views.FlocksIndexItem = Backbone.View.extend({
  template: JST['flocks/index_item'],

  className: 'flocks-index-item index-item col-xs-12 col-sm-6 col-md-4 col-lg-3',

  events: {
    'click' : 'navToFlock'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  navToFlock: function (event) {
    var flockId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/flocks/' + flockId, { trigger: true });
  },

  render: function () {
    var content = this.template({ flock: this.model });
    this.$el.html(content);
    this.$el.attr('data-id', this.model.get('id'));
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
