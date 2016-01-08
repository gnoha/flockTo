FlockTo.EventIndexTour = new Tour({
  steps: [
    {
      element: "#home-link",
      title: "Welcome to flockTo!",
      content: "flockTo is a web application where you can meet with like minded people who are also attending the event you are.<br><br>Join a flock in your community and attend the event together. You can even take it to the next level: join other flocks on the way to the event as a massive community.",
      placement: "bottom",
      next: 1,
    },
    {
      element: ".events-index",
      placement: "right",
      title: "Events",
      content: "Here, you can scroll through upcoming events or even search for the event you are looking for.",
      next: 2,
      prev: 0
    },
    {
      element: "#map-container",
      placement: "left",
      content: "You can check out where events are taking place on a global scale.",
      prev: 1
    }
  ]
});

FlockTo.EventShowTour = new Tour ({
  steps: [
    {
      
    }, 
    
  ]
});

FlockTo.FlockShowTour = new Tour ({
  
})
