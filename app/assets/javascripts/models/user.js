FlockTo.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  attended_events: function (){
    if (!this._attended_events) {
      this._attended_events = new FlockTo.Collections.Events([], { eventModel: this });
    }

    return this._attended_events;
  },

  parse: function (response) {
    if (response.attended_events) {
      this.attended_events().set(response.attended_events);
      delete response.attended_events;
    }

    return response;
  }

});
