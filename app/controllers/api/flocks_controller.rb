module Api
  class Api::FlocksController < ApplicationController
    def index
      @flocks = Flock.all
    end

    def show
      @flock = Flock.find(params[:id])
    end

    def create
      @flock = Flock.new(flock_params)
      if @flock.save
        render json: @flock
      else
        render json: @flock.errors.full_messages, status: :unproccessable_entity
      end
    end

    def update
      @flock = Flock.find(params[:id])

      if @flock
        render json: @flock
      else
        render json: @flock.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @flock = Flock.find(params[:id])
      @flock.destroy()
      render json: {}
    end

    private

    def flock_params
      params.require(:flock).permit(:title, :description, :location, :date,
                                    :event_id, :parent_id)
    end
  end
end
