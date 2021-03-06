FlockTo.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST['events/index'],

  className: "events-index",

  events: {
    'click .add-event': 'addForm',
    'submit form.search-main': 'submit'
  },

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.collection, 'sync reset', this.render);
    this.listenTo(this.collection, 'add', this.addEventCard);
    this.collection.each(this.addEventCard.bind(this));
    this.addForm();
  },

  addEventCard: function (eventModel) {
    var card = new FlockTo.Views.EventsIndexItem({ model: eventModel });
    this.addSubview('.event-index-list', card);
  },

  addForm: function () {
    var eventModel = new FlockTo.Models.Event();
    var newForm = new FlockTo.Views.EventForm({
      model: eventModel,
      collection: this.collection
    });
    this.addSubview('.event-index-list', newForm, true);
  },

  hasNone: function () {
    return this.collection.length === 0;
  },

  render: function () {
    var hasResults = true;
    if (this.hasNone()) {
      hasResults = false;
    }
    var content = this.template({ hasResults: hasResults });
    this.$el.html(content);
    this.attachSubviews();
    // this.setDatePicker();
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var searchedEvents = new FlockTo.Collections.Events();
    var input = $('.search-main').serializeJSON();
    searchedEvents.fetch({
      data: input,
      reset: true,
      success: function (response) {
        var view = new FlockTo.Views.EventsIndex({
          collection: response,
          router: this.router
        });
        this.router._swapView(view, this.router.$rootEl);

        this.router.addMap({
          collection: response,
          index: true
        });

        var tourButton = new FlockTo.Views.EventIndexTour();
        this.router.addHelpButton(tourButton);
      }.bind(this)
    });
  }
});
