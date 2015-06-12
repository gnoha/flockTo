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
    this.listenTo(this.model.flocks(), 'add', this.addCardItem);
    this.listenTo(this.model.flocks(), 'reset', this.filteredView)
    this.model.flocks().each(this.addCardItem.bind(this));
    // this.model.flocks().each(function (flock) {
    //   this.addCardItem(flock);
    // }.bind(this));
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

    this.addSubview('.flock-form-container', form);
  },

  setDatePicker: function () {
    this.$('#datepicker').removeClass("hasDatepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: '+1d'
    });
  },

  filteredView: function () {
    this.eachSubview(function (subview) {
      this.removeSubview('.flocks-list', subview)
    }.bind(this));
    this.model.flocks().each(this.addCardItem.bind(this));
    this.render();
  },

  locationQuery: function (event) {
    event.preventDefault();
    var query = $('.search-form').serializeJSON();
    query.event_id = this.model.get('id');

    $.ajax({
      url: '/api/flocks/nearbys',
      type: 'post',
      data: query,
      success: function (response) {
        this.model.flocks().reset(response);
      }.bind(this)
    });
  }
});
