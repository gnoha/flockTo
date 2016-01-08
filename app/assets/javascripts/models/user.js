FlockTo.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  // guestTour: {
  //   'indexTour': false,
  //   'eventShow': false,
  //   'flockShow': false
  // },

  been: function (){
    if (!this._been) {
      this._been = new FlockTo.Collections.Events([], { eventModel: this });
    }

    return this._been;
  },

  going: function (){
    if (!this._going) {
      this._going = new FlockTo.Collections.Events([], { eventModel: this });
    }

    return this._going;
  },

  coordinatedFlocks: function () {
    if (!this._coordinatedFlocks) {
      this._coordinatedFlocks = new FlockTo.Collections.Flocks();
    }

    return this._coordinatedFlocks;
  },

  isGuest: function () {
    if (this.get('username') === 'Guest') {
      return true;
    } else {
      return false;
    }
  },

  // coordinatedEvents: function (user) {
  //   if (!this._coordinatedEvents) {
  //     this._coordinatedEvents = new FlockTo.Collections.Events();
  //   }
  //
  //   this.attendedEvents().each(function (eventModel) {
  //     if (eventModel.get('coordinator_id') === this.id) {
  //       this._coordinatedEvents.add(eventModel);
  //     }
  //   }.bind(this));
  //
  //   return this._coordinatedEvents;
  // },

  parse: function (response) {
    if (response.been) {
      this.been().set(response.been);
      delete response.been;
    }

    if (response.going) {
      this.going().set(response.going);
      delete response.going;
    }

    if (response.coordinated_flocks) {
      this.coordinatedFlocks().set(response.coordinated_flocks);
      delete response.coordinated_flocks;
    }

    return response;
  }

});
