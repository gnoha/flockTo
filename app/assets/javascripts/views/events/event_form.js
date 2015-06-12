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
    attrs.coordinator_id = document.CURRENT_USER;
    this.model.save(attrs, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate(
          '#/events/'+ this.model.get('id'),
          { trigger: true }
        );
      }.bind(this),

      error: function (model, response) {
        alert(response.responseJSON);
      }
    });
  }
});
