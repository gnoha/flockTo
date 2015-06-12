json.extract! @user, :id, :username, :bio
json.attended_events @user.attended_events do |event|
  json.extract! event, :id, :title, :description, :date, :location
end
