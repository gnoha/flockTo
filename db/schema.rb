# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150804172928) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendings", force: :cascade do |t|
    t.integer  "flock_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "attendings", ["user_id", "flock_id"], name: "index_attendings_on_user_id_and_flock_id", unique: true, using: :btree

  create_table "events", force: :cascade do |t|
    t.string   "title",          null: false
    t.text     "description",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.date     "date",           null: false
    t.integer  "coordinator_id", null: false
    t.float    "latitude",       null: false
    t.float    "longitude",      null: false
    t.string   "location",       null: false
    t.string   "url"
    t.string   "img_url"
  end

  create_table "flocks", force: :cascade do |t|
    t.string  "title",          null: false
    t.string  "description",    null: false
    t.string  "location",       null: false
    t.integer "event_id",       null: false
    t.integer "parent_id"
    t.date    "date"
    t.integer "coordinator_id", null: false
    t.float   "latitude",       null: false
    t.float   "longitude",      null: false
    t.string  "img_url"
  end

  add_index "flocks", ["date"], name: "index_flocks_on_date", using: :btree
  add_index "flocks", ["location"], name: "index_flocks_on_location", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_token", null: false
    t.integer  "user_id",       null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.text     "bio"
    t.string   "img_url"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
