class RaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :is_favorited, :race_track_id
  belongs_to :race_track
  has_many :races_cars
  has_many :cars
end
