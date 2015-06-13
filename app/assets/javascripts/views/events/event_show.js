FlockTo.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],

  className: 'event-show-page',

  events: {
    'click .flocks-index-item' : 'navToFlock',
    'click .search-location' : 'locationQuery'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync reset', this.render);
    this.listenTo(this.model.flocks(), 'sync', this.render);
    this.addFlocksIndex();
    this.addFlockForm();
  },

  isCoord: function () {
    return CURRENT_USER_ID === this.model.get('coordinator_id')
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

  navToFlock: function (event) {
    var flockId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/flocks/' + flockId, { trigger: true });
  },

  addFlockForm: function () {
    var flock = new FlockTo.Models.Flock();
    var form = new FlockTo.Views.FlockForm({
      model: flock,
      collection: this.model
    });

    this.addSubview('.flock-form-container', form);
  },

  addFlocksIndex: function () {
    this._flocksIndex = new FlockTo.Views.FlocksIndex({
      collection: this.model.flocks()
    });
    this.addSubview('.flocks-index', this._flocksIndex);
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
