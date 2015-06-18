json.extract! @user, :id, :username, :bio
json.attended_events @user.attended_events do |event|
  json.extract! event, :id, :title, :date, :location
end
json.coordinated_flocks @user.coordinated_flocks do |flock|
  json.extract! flock, :id, :title, :date, :location
end
