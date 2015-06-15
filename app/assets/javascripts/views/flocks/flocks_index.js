FlockTo.Views.FlocksIndex = Backbone.CompositeView.extend({

  template: JST['flocks/index'],

  className: 'flocks-index',

  events: {
    'click .flocks-index-item' : 'navToFlock'
  },

  initialize: function () {
    this.listenTo(this.collection, 'add sync remove', this.render);
    this.listenTo(this.collection, 'add', this.addFlocksIndexItem);
    this.collection.each(this.addFlocksIndexItem.bind(this))
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addFlocksIndexItem: function (flock) {
    var subview = new FlockTo.Views.FlocksIndexItem({ model: flock });
    this.addSubview('.flocks-list', subview);
  },


  navToFlock: function (event) {
    var flockId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/flocks/' + flockId, { trigger: true });
  }
});
