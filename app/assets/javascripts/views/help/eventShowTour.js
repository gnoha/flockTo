FlockTo.Views.EventShowTour = Backbone.View.extend({
  template: JST['help'],

  events: {
    'click .help' : 'startTour'
  },

  initialize: function () {
    this.addTour();
  },

  addTour: function () {
      FlockTo.tour = new Shepherd.Tour({
        defaults: {
          classes: 'shepherd-theme-square'
        }
      });


      FlockTo.tour.addStep ('Detail-step', {
        title: 'Event Details',
        text: 'Here you can toggle between viewing the event details and the flocks that will be going to be converging to the event',
        attachTo: '.nav-tabs right',
        classes: 'shepherd-theme-square',
        buttons: [
          {
            text: 'Exit',
            classes: 'shepherd-button-secondary',
            action: function() {
              return FlockTo.tour.hide();
            }
          },
          
          {
            text: 'Next',
            classes: 'shepherd-button',
            action: function (e) {
              $('#flock-tab').trigger('click');
              FlockTo.tour.next();
            },
          }
        ]
      });

    FlockTo.tour.addStep ('events-step',
      {
        title: 'Flocks',
        text: 'A flock is a group that converges to an event. Find one near you and if none exist, start one today!',
        attachTo: '.tab-content right',
        classes: 'shepherd-theme-square',
        buttons: [
          {
            text: 'Exit',
            classes: 'shepherd-button-secondary',
            action: function() {
              return FlockTo.tour.hide();
            }
          },
          
          {
            text: 'Next',
            classes: 'shepherd-button',
            action: FlockTo.tour.next
          }
        ]
      });
    
    FlockTo.tour.addStep ('map-step',
      {
        title: 'Event Map',
        text: 'Check out the map to see the location of the map and where different flocks have formed. The size of the markers reflects the number of people in a flock',
        attachTo: '#map-container left',
        classes: 'shepherd-theme-square',
        buttons: [
          {
            text: 'Got It!',
            classes: 'shepherd-button',
            action: FlockTo.tour.complete
          }
        ]
      });
  },

  startTour: function () {
    if (FlockTo.tour) {
      FlockTo.tour.complete();
    }

    FlockTo.tour.start();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});