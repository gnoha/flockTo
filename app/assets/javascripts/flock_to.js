window.FlockTo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new FlockTo.Routers.Router({
      $el: $('#main'),
      flocks: new FlockTo.Collections.Flocks()
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  FlockTo.initialize();
});
