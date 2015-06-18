FlockTo.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST['events/index'],

  className: "events-index",

  events: {
    'click .events-index-item': 'navToFlocks',
    'click .add-event': 'addForm',
    'click .submit': 'submit'
  },

  initialize: function (options) {
    this.router = options.router
    this.listenTo(this.collection, 'sync reset', this.render);
    this.listenTo(this.collection, 'add', this.addEventCard);
    this.listenTo(this.collection, 'sync', this.addMap)
    this.collection.each(this.addEventCard.bind(this));
    this.addForm();
  },

  addEventCard: function (eventModel) {
    var card = new FlockTo.Views.EventsIndexItem({ model: eventModel });
    this.addSubview('.event-index-list', card);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.setDatePicker();
    return this;
  },

  navToFlocks: function (event) {
    event.preventDefault();
    var eventId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/events/'+eventId, { trigger: true });
  },

  addMap: function () {
    var map = new FlockTo.Views.MapShow({
      collection: this.collection,
      isIndex: true
    });
    this.addSubview('#map-container', map);
    map.initMap();
  },

  addForm: function () {
    var eventModel = new FlockTo.Models.Event();
    var newForm = new FlockTo.Views.EventForm({
      model: eventModel,
      collection: this.collection
    });
    this.addSubview('.form-container', newForm);
  },

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: '+1d',
      showAnim: 'fadeIn'
    });
  },

  submit: function (e) {
    e.preventDefault();
    var searchedEvents = new FlockTo.Collections.Events();
    var input = $('.search-main').serializeJSON();
    debugger
    searchedEvents.fetch({
      data: input,
      reset: true,
      success: function (response) {
        var view = new FlockTo.Views.EventsIndex({
          collection: response,
          router: this.router
        });
        this.router._swapView(view);
      }.bind(this)
    });
  }
});
