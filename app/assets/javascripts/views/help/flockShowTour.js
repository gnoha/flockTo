FlockTo.Views.FlockShowTour = Backbone.View.extend({
  template: JST['help'],

  events: {
    'click .help' : 'startTour'
  },

  className: 'help-button',


  initialize: function () {
    this.addTour();
  },

  addTour: function () {
      FlockTo.tour = new Shepherd.Tour({
        defaults: {
          classes: 'shepherd-theme-square'
        }
      });


      FlockTo.tour.addStep ('detail-step', {
        title: 'Flock Details',
        text: 'Here you can toggle between viewing the flock details and the sub-flocks that will be meeting up with this flock.',
        attachTo: '.nav-tabs left',
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
            action: function () {
              $('#sub-flocks').trigger('click');
              FlockTo.tour.next();
            }
          }
        ]
      });

    FlockTo.tour.addStep ('sub-flocks-step',
      {
        title: 'Sub-flocks',
        text: 'A sub-flock is a group that will meet up with the current flock.',
        attachTo: '.tab-content left',
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
        text: "The map shows the current flock's path to the event as well as the flock's sub-flocks.",
        attachTo: '#flock-map-container right',
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

    FlockTo.tour.addStep ('sub-flocks-step',
      {
        title: 'Join a Flock',
        text: 'You can join or leave a flock by clicking the button below.',
        attachTo: '.join-button top',
        classes: 'shepherd-theme-square',
        buttons: [
          {
            text: 'Exit',
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