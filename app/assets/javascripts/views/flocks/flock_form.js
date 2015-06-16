FlockTo.Views.FlockForm = Backbone.View.extend({
  template: JST['flocks/form'],

  tagName: 'form',

  className: 'flock-form',

  events: {
    'click .submit': 'submit',
    'click .open-form': 'openModal'
  },

  initialize: function (options) {
    this.eventId = options.eventId;
    this.parentId = options.parentId;
    this.listenTo(this.model, 'sync', this.render);
  },

  openModal: function (e) {
    $('#myModal').modal();
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
        $('#myModal').modal('toggle');
        $('.modal-backdrop').remove();
        Backbone.history.navigate(
          '#/flocks/' + this.model.get('id'),
          { trigger: true }
        );
      }.bind(this),

      error: function (model, response) {
        debugger
        $('ul.error-list').children().remove();
        response.responseJSON.forEach(function (response){
          var $error = $('<li>').html(response);
          $('.error-list').append($error);
        });
      }
    });

    return this;
  }
});
