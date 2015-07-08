FlockTo.Models.Flock = Backbone.Model.extend({
  urlRoot: '/api/flocks',

  isEvent: function () {
    return false;
  },

  subFlocks: function () {
    if (!this._subFlocks) {
      this._subFlocks = new FlockTo.Collections.Flocks();
    }

    return this._subFlocks;
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

  eventModel: function () {
    if (!this._event) {
      this._event = new FlockTo.Models.Event();
    }

    return this._event;
  },

  pathFlocks: function () {
    if (!this._pathFlocks) {
      this._pathFlocks = new FlockTo.Collections.Flocks();
    }

    return this._pathFlocks;
  },

  parse: function (response) {
    if (response.subflocks) {
      this.subFlocks().set(response.subflocks);
      delete response.subflocks;
    }

    if (response.attendees) {
      this.attendees().set(response.attendees);
      delete response.attendees;
    }

    if (response.event_model) {
      this.eventModel().set(response.event_model);
      delete response.event_model;
    }

    if (response.path) {
      this.pathFlocks().set(response.path);
      delete response.path;
    }

    if (response.coordinator) {
      this.coordinator().set(response.coordinator);
      delete response.coordinator;
    }

    return response;
  }
});
