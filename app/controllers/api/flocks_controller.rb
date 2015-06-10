module Api
  class Api::FlocksController < ApplicationController
    def index
      @flocks = Flock.all
    end

    def show
      @flock = Flock.find(params[:id])
    end

    def create
      @flock = current_user.flocks.new(flock_params)
      render json: @flock
    end

    def update
      @flock = current_user.flocks.find(params[:id])

      if @flock
        render json: @flock
      else
        render json: @flock.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @flock = current_user.flocks.find(params[:id])
      @flock.destroy()
      render json: {}
    end

    private

    def flock_params
      params.require(:flock).permit(:title, :description, :destination, :date,
                                    :date, :time)
    end
  end
end
