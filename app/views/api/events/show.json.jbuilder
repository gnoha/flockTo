json.extract! @event, :id, :title, :description, :date,
              :location, :latitude, :longitude, :num_attendees, :url, :img_url

json.coordinator @event.coordinator, :id, :username

json.flocks @event.flocks do |flock|
  json.extract! flock, :id, :title, :location, :date, :event_id, :parent_id,
                :location, :latitude, :longitude, :num_attendees, :img_url
end

json.attendees @event.attendees do |attendee|
  json.extract! attendee, :id, :username
end
