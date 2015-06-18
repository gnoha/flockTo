FlockTo.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  attendedEvents: function (){
    if (!this._attendedEvents) {
      this._attendedEvents = new FlockTo.Collections.Events([], { eventModel: this });
    }

    return this._attendedEvents;
  },

  coordinatedFlocks: function () {
    if (!this._coordinatedFlocks) {
      this._coordinatedFlocks = new FlockTo.Collections.Flocks();
    }

    return this._coordinatedFlocks
  },

  parse: function (response) {
    if (response.attended_events) {
      this.attendedEvents().set(response.attended_events);
      delete response.attended_events;
    }

    if (response.coordinated_flocks) {
      this.coordinatedFlocks().set(response.coordinated_flocks);
      delete response.coordinated_flocks
    }

    return response;
  }

});
