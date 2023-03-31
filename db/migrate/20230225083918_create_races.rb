class CreateRaces < ActiveRecord::Migration[7.0]
  def change
    create_table :races do |t|
      t.string :name
      t.integer :user_id
      t.integer :race_track_id
      t.boolean :is_favorited

      t.timestamps
    end
  end
end
