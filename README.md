# flockTo

[Heroku link][heroku]

[heroku]: http://flockto.herokuapp.com

## Minimum Viable Product
flockTo is a clone of Meetup built with Rails and Backbone.
Users will be able to:
<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create groups
- [ ] Create subgroups (to join up main group)
- [ ] Create events
- [ ] View groups
- [ ] Request to join groups
- [ ] Search for groups by title
- [ ] Search for groups by location
- [ ] Search for groups by date

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Basic Groups and Events (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create groups using
a simple text form in a Rails view. By the end of this phase, a user will be
able to create a group and then create an event.

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
administrators. Also, this is where users will be able to join an event or
request to join a group.

[Details][phase-five]

### Phase 6: Searching for Groups and Events (~2 days)
I'll need to add search routes to both the Groups and Events controllers. On the
client side, the view will contain both Group Index Items and Event Index Items.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Counter for members of groups and attendees for events
- [ ] Comments for groups and events
- [ ] Pagination/infinite scroll
- [ ] Uploading pictures in groups
- [ ] Multiple sessions/session management
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
