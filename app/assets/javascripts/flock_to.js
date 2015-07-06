window.FlockTo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CURRENT_USER_ID: window.CURRENT_USER_ID,
  initialize: function() {
    var router = new FlockTo.Routers.Router({
      $el: $('#main'),
      $map: $('#map-container'),
      $auxEl: $('#auxiliary'),
      events: new FlockTo.Collections.Events(),
      flocks: new FlockTo.Collections.Flocks(),
      users: new FlockTo.Collections.Users(),
    });

    Backbone.history.start();
  }
};



$(document).ready(function(){
    FlockTo.initialize();
});
