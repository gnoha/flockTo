json.extract! @event, :id, :title, :description, :date,
              :location, :latitude, :longitude, :num_attendees

json.coordinator @event.coordinator, :id, :username

json.flocks @event.flocks do |flock|
  json.extract! flock, :id, :title, :location, :date, :event_id, :parent_id,
                :location, :latitude, :longitude, :num_attendees
end

json.attendees @event.attendees do |attendee|
  json.extract! attendee, :id, :username, :bio
end
