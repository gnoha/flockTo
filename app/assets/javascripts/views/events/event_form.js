FlockTo.Views.EventForm = Backbone.View.extend({
  template: JST['events/form'],

  className: 'event-form',

  events: {
    'click .submit': 'submit',
    'click .open-modal': 'open',
    'click .open-edit-modal': 'openEditModal',
    'click .upload-photo': 'upload'
  },

  initialize: function (options) {
    this.edit = options.edit;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var id = 'myModal';
    var button = 'Create Event';
    var title = 'Start an Event';
    var photoButton = 'Upload Photo';
    if (this.edit) {
      id = 'editModal';
      button = 'Update Event';
      title = 'Edit Event';
      photoButton = 'Change Photo';
    }

    var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);

    var content = this.template({
      eventModel: this.model,
      edit: this.edit,
      id: id,
      button: button,
      title: title,
      minDate: tomorrow.toISOString().split("T")[0],
      photoButton: photoButton
      });
    this.$el.html(content);
    // $('.event-date').attr('min', tomorrow.toISOString().split("T")[0])
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

  upload: function (e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function (error, result) {
      var data=result[0];
      this.model.set({img_url: data.url});
    }.bind(this));
  }
});
