# Schema Information

## groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
admin_id    | integer   | not null, foreign key (references users)
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null
description | text      | not null


## administers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
group_id    | integer   | not null, foreign key (references groups)

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
group_id    | integer   | not null, foreign key (references group)
title       | string    | not null
description | text      | not null

## memberships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
group_id    | integer   | not null, foreign key (references groups)


## attendees
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
event_id    | integer   | not null, foreign key (references events)
