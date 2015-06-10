json.array!(@flocks) do |flock|
  json.extract! flock, :id, :destination, :title, :description, :date, :time
end
