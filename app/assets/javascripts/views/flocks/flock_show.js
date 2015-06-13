FlockTo.Views.FlockShow = Backbone.CompositeView.extend({
  template: JST['flocks/show'],

  className: 'flock-show',

  events: {
    'click .flocks-index-item' : 'navToFlock',
    'click .user-index-item': 'navToUser',
    'click .join-flock': 'join'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.addFlocksIndex();
    this.addAttendeesIndex();
    this.model.fetch({
      success: this.addForm.bind(this)
    });
  },

  addAttendeesIndex: function () {
    this._attendeesIndex = new FlockTo.Views.UsersIndex({
      collection: this.model.attendees()
    });
    this.addSubview('.attendees-index', this._attendeesIndex);
  },

  addFlocksIndex: function () {
    this._flocksIndex = new FlockTo.Views.FlocksIndex({
      collection: this.model.subFlocks()
    });
    this.addSubview('.sub-flocks-index', this._flocksIndex);
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

  addForm: function () {
    var post = new FlockTo.Models.Flock();
    var formView = new FlockTo.Views.FlockForm({
      model: post,
      eventId: this.model.get('event_id'),
      parentId: this.model.id
    });

    this.addSubview('.subflock-form-container', formView);
  },

  navToFlock: function (event) {
    var flockId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/flocks/' + flockId, { trigger: true });
  },

  navToUser: function (event) {
    var userId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/users/' + userId, {trigger: true});
  },

  // // joining: function () {
  // //   $('.join-flock').toggleClass('joining').attr('disabled');
  // // },
  // //
  // isJoined: function () {
  //   this.model.attributes.attendeeIds.indexOf(CURRENT_USER_ID) !== -1;
  // },
  //
  // joinAction: function () {
  //   //Not joined -> Join
  //   $joinButton = $('button.join-flock');
  //
  //   if ($joinButton)
  //   $joinButton.removeClass('not-joined');
  //   $joinButton.addClass('joined');
  //   $joinButton.text('Leave Flock')
  // },

  join: function (event) {
    event.preventDefault();
    var attending = new FlockTo.Models.Attending();
    attending.fetch({
      data: {'attending': {'flock_id': this.model.id}},
      success: function (response) {
        debugger
      }
    });

  },

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: '+1d'
    });
  }
});
