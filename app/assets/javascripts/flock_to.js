window.FlockTo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CURRENT_USER_ID: window.CURRENT_USER_ID,
  Tour: {
    index: false,
    event: false,
    flock: false
  },
  initialize: function() {
    var router = new FlockTo.Routers.Router({
      $el: $('#main'),
      $map: $('#map-container'),
      $auxEl: $('#auxiliary'),
      $button: $('#help-button'),
      events: new FlockTo.Collections.Events(),
      flocks: new FlockTo.Collections.Flocks(),
      users: new FlockTo.Collections.Users()
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
    FlockTo.initialize();
});
