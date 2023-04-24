class User < ApplicationRecord
 
  has_many :races, dependent: :destroy
  has_many :races_cars, through: :races
  
  
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }


  has_secure_password
  end