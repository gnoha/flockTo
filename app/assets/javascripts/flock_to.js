window.FlockTo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new FlockTo.Routers.Router({
      $el: $('#main'),
      collection: new FlockTo.Collections.Events()
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  FlockTo.initialize();
});
