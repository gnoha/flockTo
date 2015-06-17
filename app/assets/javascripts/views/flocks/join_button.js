FlockTo.Views.JoinButton = Backbone.View.extend({
  template: JST['flocks/join_button'],

  events: {
    'click .attending': 'joinOrLeave'
  },

  initialize: function (options) {
    this.attending = options.attending;
    this.currentUser = options.currentUser;
    this.flockId = options.flockId;
    this.listenTo(this.attending, 'add sync remove', this.render);
    this.render();
  },

  render: function () {
    var button = this.template();
    this.$el.html(button);
    var $join = $('.attending');
    if (this.attending.isNew()) {
      $join.addClass('not-joined');
      $join.html('Join Flock');
    } else {
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
          this.collection.add(this.currentUser);
        }.bind(this)
      });
    } else {
      this.attending.destroy({
        success: function () {
          this.collection.remove(this.currentUser);
          this.attending.clear();
          this.render();
        }.bind(this)
      });
    }
  }
});
