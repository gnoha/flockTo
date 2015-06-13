FlockTo.Views.FlockForm = Backbone.View.extend({
  template: JST['flocks/form'],

  tagName: 'form',

  className: 'flock-form form',

  events: {
    'click .submit': 'submit'
  },

  initialize: function (options) {
    this.eventId = options.eventId;
    this.parentId = options.parentId;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ flock: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formAttrs = this.$el.serializeJSON().flock;

    if (this.parentId) {
      formAttrs.event_id = this.eventId
      formAttrs.parent_id = this.parentId
    } else {
      formAttrs.event_id = this.eventId
    }

    formAttrs.coordinator_id = CURRENT_USER_ID;

    this.model.save(formAttrs, {
      patch: true,

      success: function () {
        Backbone.history.navigate(
          '#/flocks/' + this.model.get('id'),
          { trigger: true }
        );
      }.bind(this),

      error: function (model, response) {
        alert(response.responseJSON);
      }
    });

    return this;
  }
});
