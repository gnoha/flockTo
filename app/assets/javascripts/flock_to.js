window.FlockTo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CURRENT_USER: document.CURRENT_USER,
  initialize: function() {
    var router = new FlockTo.Routers.Router({
      $el: $('#main'),
      events: new FlockTo.Collections.Events(),
      flocks: new FlockTo.Collections.Flocks()
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  FlockTo.initialize();
});
