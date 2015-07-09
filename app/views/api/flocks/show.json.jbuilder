json.extract! @flock, :id, :title, :location, :date,
              :description, :event_id, :parent_id,
              :latitude, :longitude, :num_attendees

json.coordinator @flock.coordinator, :id, :username

json.event_model @flock.event, :id, :title, :location, :date,
                 :latitude, :longitude, :num_attendees

json.path @flock.path do |flock|
  json.extract! flock, :id, :title, :location, :date, :latitude,
                :longitude, :num_attendees, :parent_id, :event_id
end

json.subflocks @flock.subflocks do |subflock|
  json.extract! subflock, :id, :title, :location, :date,
                :latitude, :longitude, :parent_id, :event_id, :img_url
end

json.attendees @flock.attendees do |attendee|
  json.extract! attendee, :id, :username
end
