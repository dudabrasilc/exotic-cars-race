class RacesController < ApplicationController
    
    def index
      races = @current_user.races
      render json: races, include: [:races_cars, :cars, :race_track]
    end

    def show
      race = @current_user.races.find(params[:id])
      render json: race, status: :ok
    end

    
    def create
      race = @current_user.races.create!(race_params)
      render json: race, include: [:race_track], status: :created
    end

      def destroy
        race = @current_user.races.find(params[:id])
        race.destroy()
        render json: {}
    end


    def update
      race = @current_user.races.find(params[:id])
      race.update!(race_params)
      render json: race, status: :ok
  end

      private
    
      def race_params
        params.permit(:id, :name, :is_favorited, :race_track_id)
      end
      
    end 