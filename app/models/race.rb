class Race < ApplicationRecord
    belongs_to :user
    belongs_to :race_track
    has_many :races_cars
    has_many :cars, through: :races_cars, dependent: :destroy

    validates :name, presence: true
end
