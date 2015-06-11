FlockTo.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['events/show'],

  className: 'event-show-page',

  events: {
    'click .flocks-index-item' : 'navToFlock'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.flocks(), 'sync', this.render);
    this.listenTo(this.model.flocks(), 'add', this.addCardItem);
    this.model.flocks().each(function (flock) {
      this.addCardItem(flock);
    }.bind(this));
    this.addFlockForm();
  },

  addCardItem: function (flock) {
    var cardSubview = new FlockTo.Views.FlocksIndexItem({ model: flock });
    this.addSubview('.flocks-list', cardSubview);
  },

  render: function () {
    var content = this.template({ eventModel: this.model });
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

    this.addSubview('.form-goes-here', form);
  },

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd"
    });
  }
});
