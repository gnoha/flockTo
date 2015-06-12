FlockTo.Views.FlockShow = Backbone.CompositeView.extend({
  template: JST['flocks/show'],

  className: 'flock-show',

  events: {
    'click .flocks-index-item' : 'navToFlock',
    'click .users-index-item': 'navToUser'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.subFlocks(), 'sync', this.render);
    this.listenTo(this.model.subFlocks(), 'add', this.addFlockCards);
    this.model.subFlocks().each(function (subFlock) {
      this.addFlockCards(subFlock);
    }.bind(this));
    this.addForm();
  },

  addFlockCards: function (subFlock) {
    var card = new FlockTo.Views.FlocksIndexItem({
      model: subFlock
    });
    this.addSubview('.sub-flock', card);
  },

  addAttendeeCards: function (user) {
    var card = new FlockTo.Views.UsersIndexItem({
      model: user
    });
    this.addSubview('.attendees');
  },

  render: function() {
    var content = this.template({ flock: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.setDatePicker();
    return this;
  },

  addForm: function () {
    var post = new FlockTo.Models.Flock();

  //I don't know about this one...
    var events = new FlockTo.Collections.Events();
    var eventModel = events.getOrFetch(post.get('id'));
    var formView = new FlockTo.Views.FlockForm({
      model: post,
      collection: eventModel,
      parent: this.model
    });

    this.addSubview('.subflock-form-container', formView);
  },

  navToFlock: function (event) {
    var flockId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/flocks/' + flockId, { trigger: true });
  },

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: '+1d'
    });
  }
});
