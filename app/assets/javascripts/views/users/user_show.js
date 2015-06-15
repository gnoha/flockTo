FlockTo.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.addEventsIndex();
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addEventsIndex: function () {
    var indexView = new FlockTo.Views.EventsIndex({
      collection: this.model.attendedEvents()
    });
    this.addSubview('.events-index', indexView);
  }
  //
  // addEventCards: function (e) {
  //   var card = new FlockTo.Views.EventsIndexItem({ model: e });
  //   this.addSubview('.user-events', card);
  // }


});
