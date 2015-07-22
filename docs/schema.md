# Schema Information

## flocks
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null
description    | text      | not null
location       | string    | not null
latitude       | string    | not null, needed for geocoder
longitude      | string    | not null, needed for geocoder
date           | date      | not null
time           | time      | not null
coordinator_id | integer   | not null, foreign key (references users)
parent_id      | integer   | foreign key (references parent flocks)
img_url        | string    | 


## flocks
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null
description    | text      | not null
location       | string    | not null
latitude       | string    | not null, needed for geocoder
longitude      | string    | not null, needed for geocoder
date           | date      | not null
time           | time      | not null
coordinator_id | integer   | not null, foreign key (references users)
url            | string    |
img_url        | string    | 



## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique true
session_token   | string    | not null
password_digest | string    | not null
bio             | text      | 
img_url         | string    | 


## attendings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
flock_id    | integer   | not null, foreign key (references events)
