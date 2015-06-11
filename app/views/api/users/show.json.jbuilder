json.extract! @user, :id, :username, :bio
json.attendances @user.attendances do |attendance|
  json.extract! attendance, :id, :title, :description, :date
end
