json.extract! @flock, :id, :title, :location, :date,
              :description, :event_id, :parent_id, :coordinator_id


json.subflocks @flock.subflocks do |subflock|
  json.extract! subflock, :id, :title, :location, :date,
              :description, :event_id, :parent_id
end
json.attendees @flock.attendees do |attendee|
  json.extract! attendee, :id, :username, :bio
end
