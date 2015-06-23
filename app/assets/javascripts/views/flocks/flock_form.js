FlockTo.Views.FlockForm = Backbone.View.extend({
  template: JST['flocks/form'],

  tagName: 'form',

  className: 'flock-form',

  events: {
    'click .submit': 'submit',
    'click .open-form': 'openModal',
    'click .open-edit-modal': 'openEditModal'
  },

  initialize: function (options) {
    this.edit = options.edit
    this.eventId = options.eventId;
    this.parentId = options.parentId;
    this.maxDate = options.maxDate;
    this.listenTo(this.model, 'sync', this.render);
  },

  openEditModal: function (e) {
    $('#editModal').modal();
  },

  openModal: function (e) {
    $('#myModal').modal();
  },

  render: function () {
    var id = 'myModal';
    var button = 'Create Flock';
    var title = 'Start a Flock';
    if (this.edit) {
      id = 'editModal';
      button = 'Update Flock';
      title = 'Edit Flock';
    }

    var today = new Date();
    var content = this.template({
      flock: this.model,
      edit: this.edit,
      id: id,
      button: button,
      title: title,
      minDate: today.toISOString().split("T")[0],
      maxDate: this.maxDate
    });
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
        if (this.edit) {
          $('#editModal').modal('toggle');
        } else {
          $('#myModal').modal('toggle');
        }
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
