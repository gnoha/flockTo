FlockTo.Views.EventIndexTour = Backbone.View.extend({
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


      FlockTo.tour.addStep ('Welcome-step', {
        title: 'Welcome to flockTo!',
        text: 'flockTo is an application to help you find a community attending an event you plan on attending with the goal of growing the community along the way.',
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
            action: FlockTo.tour.next,
          }
        ]
      });

    FlockTo.tour.addStep ('events-step',
      {
        title: 'Events',
        text: 'Search for an event using the search bar, or browse events below',
        attachTo: '.search-main right',
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
            action: FlockTo.tour.next,
          }
        ]
      });
    
    FlockTo.tour.addStep ('map-step',
      {
        title: 'Map',
        text: 'Check out the map to see where events are located',
        attachTo: '#map-container left',
        classes: 'shepherd-theme-square',
        buttons: [
          {
            text: 'Exit',
            classes: 'shepherd-button-secondary',
            action: function() {
              return FlockTo.tour.hide();
            }
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