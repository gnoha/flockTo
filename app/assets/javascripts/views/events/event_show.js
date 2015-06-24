FlockTo.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],

  className: 'event-show-page',

  events: {
    'click .location-query' : 'locationQuery',
    // 'click .edit-form': 'openModal',
  },

  initialize: function (options) {
    this.users = options.users;
    this.listenTo(this.model, 'sync', this.render);
    this.addAttendeesIndex();
    this.addFlocksIndex();
    this.addFlockForm();
    this.addEditForm();
  },


  addAttendeesIndex: function () {
    this._attendeesIndex = new FlockTo.Views.UsersIndex({
      collection: this.model.attendees()
    });
    this.addSubview('.attendees-index', this._attendeesIndex);
  },

  addEditForm: function () {
    if (this.isCoord()) {
      var form = new FlockTo.Views.EventForm({
        model: this.model,
        eventId: this.model.id,
        collection: this.collection,
        edit: true
      });

      this.addSubview('.edit-form-container', form);
    }
  },

  addFlockForm: function () {
    var flock = new FlockTo.Models.Flock();
    var form = new FlockTo.Views.FlockForm({
      model: flock,
      eventId: this.model.id,
      maxDate: this.model.get('date')
    });

    this.addSubview('.flock-form', form);
  },

  addFlocksIndex: function () {
    this._flocksIndex = new FlockTo.Views.FlocksIndex({
      collection: this.model.flocks()
    });
    this.addSubview('.flocks-index', this._flocksIndex);
  },

  addMap: function () {
    var map = new FlockTo.Views.MapShow({
      collection: this.model.flocks(),
      currentModel: this.model,
      eventModel: this.model
    });
    this.addSubview('#map-container', map);
    map.initMap();
  },

  filteredView: function () {
    this.removeSubview('.flocks-index', this._flocksIndex);
    this.addFlocksIndex();
    this.render();
  },

  isCoord: function () {
    return CURRENT_USER_ID === this.model.get('coordinator_id');
  },

  locationQuery: function (event) {
    event.preventDefault();
    var query = $('.search-form').serializeJSON();
    query.event_id = this.model.get('id');

    this.model.flocks().fetch({
      data: query,
      url: '/api/flocks/nearbys',
      success: function (response) {
        this.filteredView();
      }.bind(this)
    });
  },

  render: function () {
    var coordinator = this.model.coordinator();
    var content = this.template({
      eventModel: this.model,
      coordinator: coordinator,
      coord: this.isCoord()
      });
    this.$el.html(content);
    this.attachSubviews();
    // this.setDatePicker();
    return this;
  }
});
