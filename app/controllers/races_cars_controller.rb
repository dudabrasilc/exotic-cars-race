class RacesCarsController < ApplicationController
    def index
        render json: RacesCar.all, include: [:car, :race]
    end


    def create
        race_car = RacesCar.create!(race_car_params)
        render json: race_car, status: :created
    end

    def destroy
        race_car = RacesCar.find(params[:id])
        race_car.destroy
        render json: {}
    end 

    private

    def race_car_params
        params.permit(:car_id, :race_id, :races_car)
    end

end