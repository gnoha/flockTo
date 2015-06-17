FlockTo.Views.JoinButton = Backbone.View.extend({
  template: JST['flocks/join_button'],

  events: {
    'click .attending': 'joinOrLeave'
  },

  initialize: function (options) {
    this.attending = options.attending;
    this.flockId = options.flockId;
    this.listenTo(this.attending, 'add sync remove', this.render);
    this.listenTo(this.collection, 'add remove', this.render);
    this.render();
  },

  render: function () {
    var button = this.template();
    this.$el.html(button);
    var $join = $('.attending');
    if (this.attending.isNew()) {
      console.log('attending new');
      $join.addClass('not-joined');
      $join.html('Join Flock');
    } else {
      console.log('attending not new');
      $join.addClass('joined');
      $join.html('Leave Flock');
    }
    return this;
  },

  joinOrLeave: function (e) {
    e.preventDefault();
    if (this.attending.isNew()) {
      this.attending.save({'flock_id': this.flockId}, {
        success: function () {
          this.render();
        }.bind(this)
      });
    } else {
      this.attending.destroy({
        success: function () {
          this.attending.clear();
          this.render();
        }.bind(this)
      });
    }
  },

  toggleJoin: function () {
    // var $join = $('.attending');
    // if (this.attending.isNew()) {
    //   $join.addClass('joined');
    //   $join.html('Leave Flock');
    // } else {
    //   $join.removeClass('joined');
    //   $join.addClass('not-joined');
    //   $join.html('Join Flock');
    // }
  },


  //
  // isJoined: function () {
  //   return this.attending.id !== undefined;
  // },
  //
  // joinFlock: function () {
  //   this.attending.save({
  //     data: {'attending': {'flock_id': this.flockId}},
  //     success: function () {
  //       this.toggleJoin();
  //     }.bind(this)
  //   });
  // },

  // leaveFlock: function () {
  //   this.attending.destroy({
  //     success: function () {
  //       this.toggleJoin();
  //       this.attending.clear();
  //     }.bind(this)
  //   });
  // },

//add intermediate state and disable button?
});
