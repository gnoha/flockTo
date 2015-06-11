FlockTo.Models.Flock = Backbone.Model.extend({
  urlRoot: '/api/flocks',

  subFlocks: function () {
    if (!this._subFlocks) {
      this._subFlocks = new FlockTo.Collections.Flocks([], { flock: this });
    }

    return this._subFlocks;
  },

  parse: function (response) {
    if (response.subflocks) {
      this.subFlocks().set(response.subflocks);
      delete response.subflocks;
    }

    return response;
  }


});
