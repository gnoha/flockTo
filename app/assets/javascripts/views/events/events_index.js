FlockTo.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST['events/index'],

  className: "events-index",

  events: {
    'click .events-index-item': 'navToFlocks'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync reset', this.render);
    this.listenTo(this.collection, 'add', this.addEventCard);
    this.collection.each(function (eventModel) {
      this.addEventCard(eventModel);
    }.bind(this));
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
    this.setDatePicker()
    return this;
  },

  navToFlocks: function (event) {
    event.preventDefault();
    var eventId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/events/'+eventId, { trigger: true });
  },

  addForm: function () {
    var eventModel = new FlockTo.Models.Event();
    var newForm = new FlockTo.Views.EventForm({
      model: eventModel,
      collection: this.collection
    });
    this.addSubview('.new-event-form', newForm);
  },

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd"
    });
  }


});
