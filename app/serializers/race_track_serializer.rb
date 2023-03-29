class RaceTrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :length, :turns, :image, :vertical_gain, :description
  has_many :races
end
