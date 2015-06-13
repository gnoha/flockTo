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

  parse: function (response) {
    if (response.subflocks) {
      this.subFlocks().set(response.subflocks);
      delete response.subflocks;
    }

    if (response.attendees) {
      this.attendees().set(response.attendees);
      delete response.attendees;
    }

    return response;
  }
});
