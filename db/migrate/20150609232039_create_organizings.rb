class CreateOrganizings < ActiveRecord::Migration
  def change
    create_table :organizings do |t|
      t.integer :flock_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :organizings, :user_id
    add_index :organizings, :flock_id
  end
end
