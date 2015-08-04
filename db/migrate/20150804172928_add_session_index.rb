class AddSessionIndex < ActiveRecord::Migration
  def change
    add_index :sessions, :session_token
    add_index :sessions, :user_id
  end
end
