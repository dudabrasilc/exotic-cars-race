class CreateRacesCars < ActiveRecord::Migration[7.0]
  def change
    create_table :races_cars do |t|
      t.integer :race_id
      t.integer :car_id

      t.timestamps
    end
  end
end
