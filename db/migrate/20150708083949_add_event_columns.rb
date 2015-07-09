class AddEventColumns < ActiveRecord::Migration
  def change
    add_column :events, :url, :string
    add_column :events, :img_url, :string
    add_column :flocks, :img_url, :string
    add_column :users, :img_url, :string
  end
end
