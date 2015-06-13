class DropOrganizationsAddAttendingIndex < ActiveRecord::Migration
  def change
    drop_table :organizings

    add_index :attendings, [:user_id, :flock_id], unique: true
  end
end
