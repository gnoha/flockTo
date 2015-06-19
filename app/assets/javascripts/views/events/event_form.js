FlockTo.Views.EventForm = Backbone.View.extend({
  template: JST['events/form'],

  className: 'event-form',

  events: {
    'click .submit': 'submit',
    'click .open-modal': 'open',
    'click .open-edit-modal': 'openEditModal'
  },

  initialize: function (options) {
    this.edit = options.edit;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var id = 'myModal';
    var button = 'Create Event';
    var title = 'Start an Event'
    if (this.edit) {
      id = 'editModal';
      button = 'Update Event';
      title = 'Edit Event'
    }

    var content = this.template({
      eventModel: this.model,
      edit: this.edit,
      id: id,
      button: button,
      title: title
      });
    this.$el.html(content);

    return this;
  },

  open: function () {
    $('#myModal').modal();
  },

  openEditModal: function (e) {
    $('#editModal').modal();
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = $('form').serializeJSON().event;
    attrs.coordinator_id = CURRENT_USER_ID;
    this.model.save(attrs, {
      success: function () {
        this.collection.add(this.model);
        $('#myModal').modal('toggle');
        $('.modal-backdrop').remove();
        if (!this.edit) {
          Backbone.history.navigate(
            '#/events/'+ this.model.get('id'),
            { trigger: true }
          );
        }
      }.bind(this),

      error: function (model, response) {
        $('ul.error-list').children().remove();
        response.responseJSON.forEach(function (response){
          var $error = $('<li>').html(response);
          $('.error-list').append($error);
        });
      }
    });
  },
});
