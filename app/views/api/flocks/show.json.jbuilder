json.extract! @flock, :id, :title, :location, :date,
              :description, :event_id, :parent_id

json.coordinator @flock.coordinator do |coordinator|
  json.extract! coordinator, :id, :username, :bio
end

json.subflocks @flock.subflocks do |subflock|
  json.extract! subflock, :id, :title, :location, :date,
              :description, :event_id, :parent_id
end
json.attendees @flock.attendees do |attendee|
  json.extract! attendee, :id, :username, :bio
end
