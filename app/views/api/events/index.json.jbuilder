json.array!(@events) do |event|
  json.extract! event, :id, :title, :description, :date, :location, :latitude,
                :longitude
end
