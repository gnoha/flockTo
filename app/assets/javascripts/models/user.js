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

  coordinatedEvents: function (user) {
    if (!this._coordinatedEvents) {
      this._coordinatedEvents = new FlockTo.Collections.Events();
    }

    this.attendedEvents().each(function (eventModel) {
      if (eventModel.get('coordinator_id') === this.id) {
        this._coordinatedEvents.add(eventModel);
      }
    }.bind(this));

    return this._coordinatedEvents;
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
