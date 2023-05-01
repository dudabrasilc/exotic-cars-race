class CarsController < ApplicationController
  skip_before_action :authorize
    def index
      render json: Car.all
    end
  
    def show
      car = Car.find(params[:id])
      render json: car
    end

    def create
      car = Car.create!(car_params)
      render json: car, status: :created
    end

    def car_params
      params.permit(:make, :model, :year, :engine, :power, :torque, :zero_to_sixty_mph, :top_speed, :weight, :image)
    end


  end