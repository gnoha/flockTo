class Coordinators < ActiveRecord::Migration
  def change
    add_column :events, :coordinator_id, :integer, null: false
    add_column :flocks, :coordinator_id, :integer, null: false
  end
end
