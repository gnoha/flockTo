json.extract! @flock, :id, :title, :location, :date,
              :description, :event_id, :parent_id,
              :latitude, :longitude
json.coordinator @flock.coordinator, :id, :username
json.event_model @flock.event, :id, :title, :location, :date, :description,
                 :latitude, :longitude

json.all_event_flocks @flock.event.flocks do |flock|
  json.extract! flock, :id, :title, :location, :date, :parent_id, :latitude,
                :longitude, :num_attendees
end

json.subflocks @flock.subflocks do |subflock|
  json.extract! subflock, :id, :title, :location, :date,
                :event_id, :parent_id, :latitude, :longitude
end

json.attendees @flock.attendees do |attendee|
  json.extract! attendee, :id, :username, :bio
end
