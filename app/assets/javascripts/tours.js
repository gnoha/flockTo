FlockTo.EventIndexTour = new Tour({
  steps: [
    {
      element: "#home-link",
      title: "Welcome to flockTo!",
      content: "flockTo is a web application where you can meet with like minded people who are also attending the event you are.<br><br>Join a flock in your community and attend the event together. You can even take it to the next level: join other flocks on the way to the event as a massive community.",
      placement: "bottom",
      next: 1,
      // path: ""
    },
    {
      element: ".index-search-bar",
      placement: "right",
      title: "Events",
      content: "Here, you can scroll through upcoming events or even search for the event you are looking for.",
      next: 2,
      prev: 0,
      // path: ""
    },
    {
      element: "#map-container",
      placement: "left",
      content: "You can check out where events are taking place on a global scale.",
      prev: 1,
      // path: ""
    }
  ]
});

FlockTo.EventShowTour = new Tour ({
  steps: [
    {
      element: ".nav-tabs",
      placement: "right",
      title: "Event Details",
      content: "The 'Event Details' tab shows you everything you need to know about the event.",
      onNext: function(tour) {
        $('#flock-tab').click();
      },
      // path: RegExp("events\/\d+") 
    },
    {
      element: ".nav-tabs",
      placement: "right",
      title: "Flocks",
      content: "A flock is a group that you can join that is attending the event.<br><br>The 'Flocks' tab is where you can view all flocks that are attending the event. Use the search tool to find the flock nearest you.",
      onPrev: function(tour) {
        $('#detail-tab').click();
      },
      // path: RegExp("events\/\d+") 
    },
    {
      element: "#map-container",
      placement: "left",
      content: "Check out the map to see where the event is and all of the flocks converging to it.<br><br>The red circle is the event and the blue circles and the blue dots are the flocks converging at the event. The paths of the flocks are indicated by the lines connecting the circles.",
      // path: RegExp("events\/\d+") 

    } 
  ]
});

FlockTo.FlockShowTour = new Tour ({
  steps: [
    {
      element: ".nav-tabs",
      placement: "left",
      title: "Flock Details",
      content: "The 'Flock Details' tab provides all of the information you would need about a flock",
      onNext: function(tour) {
        $('#sub-flocks').click();
      }
    },
    {
      element: ".nav-tabs",
      placement: "left",
      title: "Sub-Flocks",
      content: "The 'Sub-Flocks' tab shows you all of the flocks that will be meeting up with the flock you are currently looking at.",
      onPrev: function(tour) {
        $('#flock-details').click();
      }
    },
    {
      element: "#flock-map-container",
      placement: "right",
      content: "The map shows the current flock (red) and its path to the event. It also shows the sub-flocks that converge at the current flock."
    },
    {
      element: ".join-button",
      placement: "top",
      content: "Click here to either join or leave the flock."
    }
  ]
});
