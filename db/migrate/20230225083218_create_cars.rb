class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.string :make
      t.string :model
      t.integer :year
      t.string :engine
      t.string :power
      t.string :torque
      t.float :zero_to_sixty_mph
      t.integer :top_speed
      t.integer :weight
      t.string :image

      t.timestamps
    end
  end
end
