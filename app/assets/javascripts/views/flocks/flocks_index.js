FlockTo.Views.FlocksIndex = Backbone.CompositeView.extend({

  template: JST['flocks/index'],

  className: 'flocks-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addFlocksIndexItem);
    this.collection.each(function(flock) {
      this.addFlocksIndexItem(flock);
    }.bind(this));

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
  }

});
