FlockTo.Views.FlockForm = Backbone.View.extend({
  template: JST['flocks/form'],

  tagName: 'form',

  className: 'flock-form',

  events: {
    'click .submit': 'submit'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ flock: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formAttrs = this.$el.serializeJSON();
    formAttrs.flock.event_id = this.collection.get('id');

    this.model.save(formAttrs.flock, {
      success: function () {
        this.collection.flocks().add(this.model);
        Backbone.history.navigate(
          '#/flocks/' + this.model.get('id'),
          { trigger: true }
        );
      }.bind(this)
    });

    return this;
  }
});
