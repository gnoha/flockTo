FlockTo.Views.FlockShow = Backbone.CompositeView.extend({
  template: JST['flocks/show'],

  className: 'flock-show',

  events: {
    'click .flocks-index-item' : 'navToFlock',
    'click .user-index-item': 'navToUser'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.subFlocks(), 'sync', this.render);
    this.listenTo(this.model.subFlocks(), 'add', this.addFlockCards);
    this.listenTo(this.model.attendees(), 'sync', this.render);
    this.listenTo(this.model.attendees(), 'add', this.addAttendeeCards);
    this.model.subFlocks().each(this.addCardItem.bind(this));
    this.model.attendees().each(this.addAttendeeCards.bind(this));
    this.addForm();
  },

  addCardItem: function (subFlock) {
    var card = new FlockTo.Views.FlocksIndexItem({
      model: subFlock
    });
    this.addSubview('.sub-flock', card);
  },

  addAttendeeCards: function (user) {
    var card = new FlockTo.Views.UsersIndexItem({
      model: user
    });
    this.addSubview('.attendees', card);
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

  navToUser: function (event) {
    var userId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/users/' + userId, {trigger: true});
  },

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: '+1d'
    });
  }
});
