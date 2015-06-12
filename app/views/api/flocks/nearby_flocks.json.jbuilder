json.array! @nearby_flocks do |flock|
  json.extract! flock, :id, :title, :location, :date,
                :description, :event_id, :parent_id,
                :coordinator_id
end
