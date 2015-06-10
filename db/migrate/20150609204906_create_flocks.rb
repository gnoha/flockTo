class CreateFlocks < ActiveRecord::Migration
  def change
    create_table :flocks do |t|
      t.string :destination
      t.string :title
      t.text :description
      t.date :date
      t.time :time


      t.timestamps null: false
    end

    add_index :flocks, :title
    add_index :flocks, :date
  end
end
