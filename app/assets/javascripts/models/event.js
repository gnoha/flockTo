FlockTo.Models.Event = Backbone.Model.extend({
  urlRoot: '/api/events',

  flocks: function () {
    if (!this._flocks) {
      this._flocks = new FlockTo.Collections.Flocks([], { eventModel: this });
    }
    return this._flocks;
  },

  attendees: function () {
    if (!this._attendees) {
      this._attendees = new FlockTo.Collections.Users([], { flock: this });
    }

    return this._attendees;
  },

  coordinator: function () {
    if (!this._coordinator) {
      this._coordinator = new FlockTo.Models.User();
    }

    return this._coordinator;
  },

  // num_attendees: function () {
  //
  // }

  parse: function (response) {
    if (response.flocks) {
      this.flocks().set(response.flocks);
      delete response.flocks;
    }

    if (response.attendees) {
      this.attendees().set(response.attendees);
      delete response.attendees;
    }

    if (response.coordinator) {
      this.coordinator().set(response.coordinator);
      delete response.coordinator;
    }

    return response;
  }
});
