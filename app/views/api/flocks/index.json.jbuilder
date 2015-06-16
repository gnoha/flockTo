json.array!(@flocks) do |flock|
  json.extract! flock, :id, :title, :description, :date, :event_id, :parent_id,
                :num_attendees
end
