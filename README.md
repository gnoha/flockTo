# flockTo

[Live link][flockTo]

[flockTo]: http://flockto.co

## Overview
flockTo is a web application build on Rails and BackboneJS where users can attend an event with their community members who are also attending the event. These smaller communities, flocks, in turn can join other flocks on the way to the event, creating a larger community. 

## Features
### Auth
Custom authentication implemented to allow multiple sessions by a single user. Passwords are hashed and salted using BCrypt and session tokens are randomly generated. 

### Map
Maps are generated by utilizing Google Maps API and illustrations are rendered to show a flock's path to the event. All markers are placed using Geocoder and lines connecting them are rendered using Google Maps Polylines.

Markers that are placed on the map are chosen based on relevancy. On a flock page, only the flock's path to the event and its immediate child flocks are shown on the map. 

### Search
Custom search required making AJAX request instead of using Backbone's #fetch(). SQL query is used to search database for events searched for. 

For location searching, Geocoder was used to measure distances from a given location.

### Parsing Data on Client-Side
Overrides Backbone's default Model#parse() in order to establish a model's attributes and to be able to process more data. This allows for eager loading on the server-side which significantly decreases the number of queries made. 


## Minimum Viable Product
flockTo is inspired by Meetup.com built with Rails and Backbone.
Users will be able to:
<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create groups
- [x] Create subgroups (to join up main group)
- [x] Create events
- [x] View groups
- [x] Request to join groups
- [x] Search for events by title
- [x] Search for groups by location
- [ ] Search for groups by date

## Design Docs
* [DB schema][schema]
* [Screen shots][views]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Basic Events and Groups(~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to sign up and log in using
a simple text form in a Rails view. By the end of this phase, a user will be
able to create an event and a group going to that event

[Details][phase-one]

### Phase 2: Viewing Groups and Events (~2 days)
I will add API routes to serve group and event data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create groups and view both groups and events, all
inside a single Backbone app. 

[Details][phase-two]

### Phase 3: Editing and Displaying Groups, Events, and Users (~1 day)
This phase will involve creating the proper forms using Backbone for creating
and updating groups, events, and user pages.

[Details][phase-three]

### Phase 4: Nav Bar (~0.5 day)
I'll be adding a nav bar and implementing different features for the nav bar.
This will allow users to easily navigate throughout the page and it will help
out in the development and testing process.

[Details][phase-four]

### Phase 5: User Implementation (~1 - 2 days)
I will be implementing the proper associations for the client side. This will
allow the users so to be able to create events or update groups only if they are
administrators. Also, this is where users will be able attend an event by 
joining a group

[Details][phase-five]

### Phase 6: Searching for Groups and Events (~2 days)
I'll need to add search routes to both the Groups and Events controllers. On the
client side, the view will contain both Group Index Items and Event Index Items. 

[Details][phase-six]

### Bonus Features (TBD)
- [ ] User profiles, with messaging and friending
- [ ] Counter for members of groups and attendees for events
- [ ] Comments for groups and events
- [ ] Pagination/infinite scroll
- [ ] Uploading pictures in groups
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
