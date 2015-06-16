FlockTo.Views.JoinButton = Backbone.View.extend({
  template: JST['flocks/join_button'],

  events: {
    'click .join-flock': 'joinOrLeave'
  },

  initialize: function (options) {
    this.attending = options.attending;
    this.flockId = options.flockId;
    this.listenTo(this.attending, 'add sync remove', this.render);
    this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function () {
    var button = this.template();
    this.$el.html(button);
    this.currentStatus();

    return this;
  },

  currentStatus: function () {
    if (this.isJoined()) {
      this.toggleJoin();
    }
  },

  isJoined: function () {
    return this.attending.id !== undefined;
  },

  joinOrLeave: function (e) {
    e.preventDefault();
    if (this.isJoined()) {
      this.leaveFlock();
    } else {
      this.joinFlock();
    }
  },

  joinFlock: function () {
    this.attending.save({
      data: {'attending': {'flock_id': this.flockId}},
      success: function () {
        this.toggleJoin();
      }.bind(this)
    });
  },

  leaveFlock: function () {
    this.attending.destroy({
      success: function () {
        this.toggleJoin();
      }.bind(this)
    });
  },

//add intermediate state and disable button?
  toggleJoin: function () {
    var $join = $('button.join-flock');
    if ($join.hasClass('not-joined')) {
      $join.removeClass('not-joined').addClass('joined');
      $join.html('Leave Flock');
    } else {
      $join.html('Join Flock');
    }
  },
});
