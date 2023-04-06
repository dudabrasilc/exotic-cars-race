require 'uri'

class Car < ApplicationRecord
  has_many :races_cars
  has_many :races, through: :races_cars


  validates :make, presence: true
  validates :model, presence: true, uniqueness: true
  validates :year, presence: true
  validates :engine, presence: true
  validates :power, presence: true
  validates :zero_to_sixty_mph, presence: true, numericality: true
  validates :torque, presence: true
  validates :top_speed, presence: true, numericality: true
  validates :image, presence: true, uniqueness: true, format: { with: URI.regexp }
  validates :weight, presence: true, numericality: true

end