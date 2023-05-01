class RacesCar < ApplicationRecord
    belongs_to :race
    belongs_to :car    
    has_many :users, through: :races
end
