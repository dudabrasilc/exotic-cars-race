class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :year, :engine, :power, :torque, :zero_to_sixty_mph, :top_speed, :image, :weight

end