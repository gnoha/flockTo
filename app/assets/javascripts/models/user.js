FlockTo.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  attendedEvents: function (){
    if (!this._attendedEvents) {
      this._attendedEvents = new FlockTo.Collections.Events([], { eventModel: this });
    }

    return this._attendedEvents;
  },

  parse: function (response) {
    if (response.attended_events) {
      this.attendedEvents().set(response.attended_events);
      delete response.attended_events;
    }

    return response;
  }

});
