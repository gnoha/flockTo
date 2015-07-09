json.extract! @user, :id, :username, :bio
json.been @user.been do |event|
  json.extract! event, :id, :title, :date, :location, :img_url
end

json.going @user.going do |event|
  json.extract! event, :id, :title, :date, :location, :img_url
end
json.coordinated_flocks @user.coordinated_flocks do |flock|
  json.extract! flock, :id, :title, :date, :location
end
