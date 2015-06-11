FlockTo.Models.Event = Backbone.Model.extend({
  urlRoot: '/api/events',

  flocks: function () {
    if (!this._flocks) {
      this._flocks = new FlockTo.Collections.Flocks([], { eventModel: this });
    }
    return this._flocks;
  },

  parse: function (response) {
    if (response.flocks) {
      this.flocks().set(response.flocks);
      delete response.flocks;
    }

    return response;
  }
});
