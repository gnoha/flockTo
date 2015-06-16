json.extract! @event, :id, :title, :description, :date, :coordinator_id,
              :location, :latitude, :longitude

json.flocks @event.flocks do |flock|
  json.extract! flock, :id, :title, :location, :date, :event_id, :parent_id,
                :location, :latitude, :longitude
end

json.attendees @event.attendees do |attendee|
  json.extract! attendee, :id, :username, :bio
end
