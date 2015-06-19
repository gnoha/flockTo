window.FlockTo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CURRENT_USER_ID: window.CURRENT_USER_ID,
  initialize: function() {
    $('.secrets').on('click', function () {
      var $a = $('<div>').css({'height': '400px', 'width': '100%', 'overflow': 'hidden'})
      $('#map-container').html($a);
      $a.disco();
    });

    var router = new FlockTo.Routers.Router({
      $el: $('#main'),
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
