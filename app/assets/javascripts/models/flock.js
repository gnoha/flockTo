FlockTo.Models.Flock = Backbone.Model.extend({
  urlRoot: '/api/flocks',

  subFlocks: function () {
    if (!this._subFlocks) {
      this._subFlocks = new FlockTo.Collections.Flocks([], { flock: this });
    }

    return this._subFlocks;
  },

  attendees: function () {
    if (!this._attendees) {
      this._attendees = new FlockTo.Collections.Users([], { flock: this });
    }

    return this._attendees;
  },

  eventModel: function () {
    if (!this._event) {
      this._event = new FlockTo.Models.Event();
    }

    return this._event;
  },

  eventFlocks: function () {
    if (!this._eventFlocks) {
      this._eventFlocks = new FlockTo.Collections.Flocks();
    }

    return this._eventFlocks;
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

    if (response.all_event_flocks) {
      this.eventFlocks().set(response.all_event_flocks);
      delete response.all_event_flocks;
    }
    
    return response;
  }
});
