class AddGeocoder < ActiveRecord::Migration
  def change
    add_column :flocks, :latitude, :float, null: false
    add_column :flocks, :longitude, :float, null: false

    add_column :events, :latitude, :float, null: false
    add_column :events, :longitude, :float, null: false
  end
end
