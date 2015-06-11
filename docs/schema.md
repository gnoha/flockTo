# Schema Information

## flocks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      | not null
location    | text      | not null
date        | date      | not null
time        | time      | not null

##subflockings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
parent_id       | string    | not null, foreign key (references flocks)
child_id        | string    | not null, foreign key (references flocks)


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique true
session_token   | string    | not null
password_digest | string    | not null


## organizings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
flock_id    | integer   | not null, foreign key (references events)

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
content     | text      | not null
rating      | integer   | not null

## attendings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
flock_id    | integer   | not null, foreign key (references events)
