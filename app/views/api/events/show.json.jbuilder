json.extract! @event, :id, :title, :description, :date
json.flocks @event.flocks do |flock|
  json.extract! flock, :id, :title, :location, :date, :event_id, :parent_id
end
