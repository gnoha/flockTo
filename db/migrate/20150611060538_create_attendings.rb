class CreateAttendings < ActiveRecord::Migration
  def change
    create_table :attendings do |t|
      t.integer :flock_id, null:false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
  end
end
