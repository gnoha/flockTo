FlockTo.Views.FlocksIndexItem = Backbone.View.extend({
  template: JST['flocks/index_item'],

  className: 'flocks-index-item index-item-wrapper col-xs-12',

  events: {
    'click' : 'navToFlock'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  navToFlock: function (event) {
    var flockId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/flocks/' + flockId, { trigger: true });
  },

  render: function () {
    var content = this.template({ flock: this.model });
    this.$el.html(content);
    this.$el.attr('data-id', this.model.get('id'));
    if (this.model.get('img_url')){
      this.$el.children('.index-item').css({
        'background-image': 'url(' + this.model.get('img_url') + ')',
        'background-size': 'cover'});
      }
    return this;
  }
});
