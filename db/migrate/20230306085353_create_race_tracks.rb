class CreateRaceTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :race_tracks do |t|
      t.string :name
      t.string :location
      t.string :description
      t.float :length
      t.integer :turns
      t.string :image
      t.integer :vertical_gain
      t.integer :race_id


      t.timestamps
    end
  end
end
