FlockTo.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.coordinatedFlocks(), 'add sync', this.addFlockCards);
    this.listenTo(this.model.been(), 'add sync', this.addBeen);
    this.listenTo(this.model.going(), 'add sync', this.addGoing);


    this.model.been().each(this.addBeen.bind(this));
    this.model.going().each(this.addGoing.bind(this));
    this.model.coordinatedFlocks().each(this.addFlockCards.bind(this));
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addGoing: function (e) {
    var card = new FlockTo.Views.EventsIndexItem({ model: e });
    this.addSubview('.going-index', card);
  },

  addBeen: function (e) {
    var card = new FlockTo.Views.EventsIndexItem({ model: e });
    this.addSubview('.been-index', card);
  },

  addFlockCards: function (f) {
    var card = new FlockTo.Views.FlocksIndexItem({ model: f });
    this.addSubview('.coordinated-flocks-index', card);
  }


});
