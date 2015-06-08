# Phase 2: Viewing Groups and Events

## Rails
### Models

### Controllers
Api::GroupsController (create, destroy, index, show, update)
Api::EventsController (create, destroy, show, update)

### Views
* groups/index.json.jbuilder
* events/index.json.jbuilder

## Backbone
### Models
* Group (parses nested `events` association)
* Event

### Collections
* Groups
* Events

### Views
* GroupIndex (composite view, contains GroupIndexItem subviews)
* GroupShow (composite view, contains EventIndexItem subviews)
* GroupIndexItem
* EventsIndex (composite view, contains EventIndexItem subviews)
* EventShow
* EventIndexItem

## Gems/Libraries
* gem 'rails-backbone'
* gem 'jbuilder'
