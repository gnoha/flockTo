class Changeflocks < ActiveRecord::Migration
  def change
    drop_table :flocks

    create_table :flocks do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :location, null: false
      t.integer :event_id, null: false
      t.integer :parent_id
      t.date :date
    end

    add_index :flocks, :location
    add_index :flocks, :date
  end

end
