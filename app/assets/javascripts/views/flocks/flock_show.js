FlockTo.Views.FlockShow = Backbone.CompositeView.extend({
  template: JST['flocks/show'],

  className: 'flock-show',

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.users = options.users
    this.listenTo(this.model, 'sync', this.render);
    this.addAttendeesIndex();
    this.addButton();
    this.addCoordinator();
    this.addEditForm();
    this.addFlocksIndex();
    this.addNewForm();
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

  addCoordinator: function () {
    var coord = this.users.getOrFetch(this.model.get('coordinator_id'));
    var coordView = new FlockTo.Views.UsersIndexItem({
      model: coord
    });
    this.addSubview('.coordinator', coordView);
  },

  addEditForm: function () {
    if (this.isCoord()) {
      var formView = new FlockTo.Views.FlockForm({
        model: this.model,
        eventId: this.model.get('event_id'),
        parentId: this.model.id,
        edit: true
      });

      this.addSubview('.edit-form-container', formView);
    }
  },

  addFlocksIndex: function () {
    this._flocksIndex = new FlockTo.Views.FlocksIndex({
      collection: this.model.subFlocks()
    });
    this.addSubview('.sub-flocks-index', this._flocksIndex);
  },

  addNewForm: function () {
    var newFlock = new FlockTo.Models.Flock();
    var formView = new FlockTo.Views.FlockForm({
      model: newFlock,
      eventId: this.model.get('event_id'),
      parentId: this.model.id
    });

    this.addSubview('.subflock-form', formView);
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
