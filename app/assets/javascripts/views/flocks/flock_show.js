FlockTo.Views.FlockShow = Backbone.CompositeView.extend({
  template: JST['flocks/show'],

  className: 'flock-show',

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, 'sync', this.render);
    this.addButton();
    this.addFlocksIndex();
    this.addAttendeesIndex();
    //Refactor this
    this.model.fetch({
      success: function () {
        this.addForm();
        this.addMap();
      }.bind(this)
    });
  },

  addAttendeesIndex: function () {
    this._attendeesIndex = new FlockTo.Views.UsersIndex({
      collection: this.model.attendees()
    });
    this.addSubview('.attendees-index', this._attendeesIndex);
  },

  addButton: function () {
    this._button = new FlockTo.Views.JoinButton({
      attending: this.attending(),
      flockId: this.model.id,
      collection: this.model.attendees(),
      currentUser: this.currentUser
    });
    this.addSubview('.join-button', this._button);
  },

  addFlocksIndex: function () {
    this._flocksIndex = new FlockTo.Views.FlocksIndex({
      collection: this.model.subFlocks()
    });
    this.addSubview('.sub-flocks-index', this._flocksIndex);
  },

  addForm: function () {
    var post = new FlockTo.Models.Flock();
    var formView = new FlockTo.Views.FlockForm({
      model: post,
      eventId: this.model.get('event_id'),
      parentId: this.model.id
    });

    this.addSubview('.subflock-form-container', formView);
  },

  addMap: function () {
    var map = new FlockTo.Views.MapShow({
      collection: this.model.eventFlocks(),
      currentModel: this.model,
      eventModel: this.model.eventModel()
    });
    this.addSubview('#map-container', map);
    map.initMap();
  },

  attending: function () {
    this._attending = new FlockTo.Models.Attending();
    this._attending.fetch({
      data: {'attending': {'flock_id': this.model.id}}
    });

    return this._attending
  },

  isCoord: function () {
    return CURRENT_USER_ID === this.model.get('coordinator_id')
  },

  render: function() {
    var content = this.template({
      flock: this.model,
      coord: this.isCoord()
      });
    this.$el.html(content);
    this.attachSubviews();
    this.setDatePicker();
    return this;
  },

  setDatePicker: function () {
    var date = new Date(this.model.get('date'))
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: '+1d',
      maxDate: date
    });
  }
});
