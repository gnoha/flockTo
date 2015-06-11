FlockTo.Views.EventForm = Backbone.View.extend({
  template: JST['events/form'],

  tagName: 'form',

  className: 'event-form',

  events: {
    'click .submit': 'submit'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ eventModel: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().event;
    this.model.save(attrs, {
      success: function () {
        this.collection.add(this.model);
        debugger
        Backbone.history.navigate(
          '#/events/'+ this.model.get('id'),
          { trigger: true }
        );
      }.bind(this),
    });
  }
});
