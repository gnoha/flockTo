FlockTo.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],

  className: 'event-show-page',

  events: {
    'click .search-location' : 'locationQuery'
  },

  initialize: function (options) {
    this.users = options.users;

    this.listenTo(this.model, 'sync reset', this.render);
    this.listenTo(this.model, 'sync', this.addCoordinator);

    this.addAttendeesIndex();
    this.addFlocksIndex();
    this.addFlockForm();
    this.model.fetch({
      success: function () {
        this.addMap();
      }.bind(this)
    });
  },

  isCoord: function () {
    return CURRENT_USER_ID === this.model.get('coordinator_id');
  },

  render: function () {
    var content = this.template({
      eventModel: this.model,
      coord: this.isCoord()
      });
    this.$el.html(content);
    this.attachSubviews();
    this.setDatePicker();
    return this;
  },

  addFlockForm: function () {
    var flock = new FlockTo.Models.Flock();
    var form = new FlockTo.Views.FlockForm({
      model: flock,
      eventId: this.model.id
    });

    this.addSubview('.flock-form-container', form);
  },

  addFlocksIndex: function () {
    this._flocksIndex = new FlockTo.Views.FlocksIndex({
      collection: this.model.flocks()
    });
    this.addSubview('.flocks-index', this._flocksIndex);
  },

  addAttendeesIndex: function () {
    this._attendeesIndex = new FlockTo.Views.UsersIndex({
      collection: this.model.attendees()
    });
    this.addSubview('.attendees-index', this._attendeesIndex);
  },

  addCoordinator: function () {
    var coord = this.users.getOrFetch(this.model.get('coordinator_id'));
    var coordView = new FlockTo.Views.UsersIndexItem({
      model: coord
    });
    this.addSubview('.coordinator', coordView);
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

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: '+1d'
    });
  },

  filteredView: function () {
    this.removeSubview('.flocks-index', this._flocksIndex);
    this.addFlocksIndex();
    this.render();
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
  }
});
