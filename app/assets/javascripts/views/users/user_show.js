FlockTo.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.coordinatedFlocks(), 'add sync', this.addFlockCards);
    this.listenTo(this.model.attendedEvents(), 'add sync', this.addEventCards);

    this.model.coordinatedFlocks().each(this.addFlockCards.bind(this));
    this.model.attendedEvents().each(this.addEventCards.bind(this));
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },


  addEventCards: function (e) {
    var card = new FlockTo.Views.EventsIndexItem({ model: e });
    this.addSubview('.attending-index', card);
  },

  addFlockCards: function (f) {
    var card = new FlockTo.Views.FlocksIndexItem({ model: f });
    this.addSubview('.coordinated-index', card);
  }


});
